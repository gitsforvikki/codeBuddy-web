import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../../utils/socket/socket";

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
    <div className="flex flex-col h-screen bg-base-100 md:pt-24">
      {/* Chat Header */}
      <div className="bg-base-200 border-b border-base-300 p-3 md:p-6 sticky top-0 z-10 md:static">
        <div className="max-w-4xl mx-auto flex items-center gap-3 md:gap-4">
          <div className="avatar">
            <div className="w-10 md:w-12 rounded-full ring-2 ring-primary">
              <img
                src={withUser?.photoUrl}
                alt={withUser?.firstName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg md:text-2xl font-bold truncate">
              💬 Chat with {withUser?.firstName?.toUpperCase()}
            </h1>
            <p className="text-xs md:text-sm text-base-content/60">Connected</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 max-w-4xl mx-auto w-full">
        {messages && messages.length > 0 ? (
          messages.map(({ firstName, lastName, text, senderId }, index) => {
            const isCurrentUser = user.firstName === firstName;
            return (
              <div
                key={index}
                className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-8 md:w-10 rounded-full">
                    <img
                      alt={firstName}
                      src={isCurrentUser ? user?.photoUrl : withUser?.photoUrl}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="chat-bubble max-w-xs md:max-w-md lg:max-w-lg text-sm md:text-base bg-primary text-primary-content break-words">
                  {text}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full text-base-content/50">
            <p>Start a conversation with {withUser?.firstName}...</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-base-200 border-t border-base-300 p-3 md:p-6 sticky bottom-0">
        <div className="max-w-4xl mx-auto flex gap-2 md:gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="input input-bordered flex-1 text-sm md:text-base"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="btn btn-primary btn-sm md:btn-md gap-2"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        <p className="text-xs md:text-sm text-base-content/50 mt-2">
          💡 Press Enter to send
        </p>
      </div>
    </div>
  );
};
