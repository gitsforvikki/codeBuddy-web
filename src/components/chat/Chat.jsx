// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../../utils/socket/socket";
// import { useSelector } from "react-redux";

// export const ChatPage = () => {
//   const { withUserId } = useParams();
//   const [newMessage, setNewMessage] = useState("");
//   const { user } = useSelector((state) => state.user);
//   const loggedInUserId = user?._id;
//   useEffect(() => {
//     if (!loggedInUserId) return;
//     const socket = createSocketConnection();
//     //as soon as page load the socket connection is made and joinChat event emited
//     socket.emit("joinChat", {
//       firstName: user?.firstName,
//       loggedInUserId,
//       withUserId,
//     });

//     //listen the message server emited to the room
//     socket.on("receivedMessage", ({ firstName, text }) => {
//       console.log(firstName + " says " + text);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [loggedInUserId, withUserId]);

//   const sendMessage = () => {
//     const socket = createSocketConnection();
//     socket.emit("sendMessage", {
//       firstName: user?.firstName,
//       loggedInUserId,
//       withUserId,
//       text: newMessage,
//     });
//   };
//   return (
//     <div className="mt-24 mb-32">
//       <div className="container w-9/10 mx-auto mt-8">
//         <h1 className="border-b border-gray-400 pb-2 w-7/10">
//           Chat with ${withUserId}
//         </h1>
//         <div className="flex flex-col mt-12 border rounded px-4 py-6 w-7/10 ">
//           <div className=" h-60">
//             <h2>messhae</h2>
//           </div>
//           <div className="flex gap-x-5">
//             <input
//               type=" text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type..."
//               className="px-4 rounded-2xl border border-gray-300 text-white py-3 w-4/10"
//             />
//             <button
//               onClick={sendMessage}
//               className="btn btn-secondary px-8 py-1 text-xl rounded-3xl shadow shadow-gray-300"
//             >
//               send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket/socket";
import { useSelector } from "react-redux";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ChatPage = () => {
  const { withUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useSelector((state) => state.user);
  const loggedInUserId = user?._id;

  const socketRef = useRef(null);
  const { connections } = useSelector((state) => state.connection);
  const withUser = connections?.find(
    (each) => parseInt(each._id) === parseInt(withUserId),
  );

  useEffect(() => {
    if (!loggedInUserId || !withUserId) return;

    if (!socketRef.current) {
      socketRef.current = createSocketConnection();
    }

    const socket = socketRef.current;

    socket.emit("joinChat", {
      firstName: user?.firstName,
      loggedInUserId,
      withUserId,
    });

    const handleMessage = ({ firstName, lastName, text }) => {
      setMessages((prev) => [...prev, { firstName, lastName, text }]);
    };

    socket.on("messageReceived", handleMessage);

    return () => {
      socket.off("messageReceived", handleMessage);
      // ❌ do NOT disconnect here
    };
  }, [loggedInUserId, withUserId]);

  const sendMessage = () => {
    if (!socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      loggedInUserId,
      withUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const fetchChat = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/getchat/${withUserId}`, {
        withCredentials: true,
      });
      const chatMessages = chat?.data?.messages?.map((msg) => {
        const { senderId, text } = msg;
        return {
          senderId: senderId._id,
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });

      setMessages(chatMessages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <div className="mt-24 mb-32">
      <div className="container w-9/10 mx-auto mt-8">
        <h1 className="border-b border-gray-400 pb-2 w-7/10">
          Chat with {withUser?.firstName.toUpperCase()}
        </h1>

        <div className="flex flex-col mt-12 border rounded px-4 py-6 w-7/10">
          <div className="h-90 overflow-y-auto">
            {messages &&
              messages.map(({ firstName, lastName, text, senderId }, index) => {
                return (
                  <div key={index}>
                    <div
                      className={`chat  ${user.firstName === firstName ? "chat-end" : "chat-start"}`}
                    >
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          {user.firstName === firstName ? (
                            <img
                              alt="Tailwind CSS chat bubble component"
                              src={user?.photoUrl}
                            />
                          ) : (
                            <img
                              alt="Tailwind CSS chat bubble component"
                              src={withUser?.photoUrl}
                            />
                          )}
                        </div>
                      </div>
                      <div className="chat-header">
                        {firstName} {lastName}
                        <time className="text-xs opacity-50">12:45</time>
                      </div>
                      <div className="chat-bubble">{text}</div>
                      <div className="chat-footer opacity-50">Delivered</div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="flex gap-x-5">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type..."
              className="px-4 rounded-2xl border border-gray-300 py-3 w-full"
            />
            <button
              onClick={sendMessage}
              className="btn btn-secondary px-8 py-1 text-xl rounded-3xl shadow shadow-gray-300"
            >
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
