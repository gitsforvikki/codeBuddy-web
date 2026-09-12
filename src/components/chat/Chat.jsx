import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createSocketConnection } from "../../utils/socket/socket";
import { ChatShimmer } from "../simmerUi/ShimmerUi";
import { getAllConnection } from "../../redux/connections/connectionReducer";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ChatPage = () => {
  const dispatch = useDispatch();
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
    if (!connections) {
      dispatch(getAllConnection());
    }
  }, [connections, dispatch]);

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

  if (!withUser) return <ChatShimmer />;

  return (
    <div className="min-h-[calc(100vh-72px)] bg-(--connections-cream) px-3 py-4 sm:px-6 md:py-8">
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[240px_minmax(0,0.88fr)] lg:justify-center">
        <aside className="hidden self-start rounded-3xl bg-(--connections-ink) p-6 text-white shadow-[0_18px_45px_rgba(23,32,51,0.14)] lg:flex lg:h-fit lg:flex-col lg:justify-between">
          <div>
            <img
              src="/codebuddy-mark.svg"
              alt=""
              className="mb-8 h-11 w-11 rounded-2xl"
            />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f1a08f]">
              Your conversation
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight">
              Good ideas deserve a place to grow.
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Keep the momentum going with a thoughtful message and a little
              curiosity.
            </p>
            <div className="-rotate-2 mt-8 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur transition-transform hover:rotate-0">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Conversation energy
                </span>
                <span className="text-lg text-[#f1a08f]">↗</span>
              </div>
              <div className="flex h-10 items-end gap-1.5">
                <span className="h-3 w-2 rounded-full bg-[#b9d2ed]" />
                <span className="h-6 w-2 rounded-full bg-[#f1a08f]" />
                <span className="h-4 w-2 rounded-full bg-[#b9d2ed]" />
                <span className="h-8 w-2 rounded-full bg-[#f3c7a4]" />
                <span className="h-5 w-2 rounded-full bg-[#b9d2ed]" />
                <span className="h-9 w-2 rounded-full bg-[#f1a08f]" />
                <span className="h-7 w-2 rounded-full bg-[#f3c7a4]" />
                <span className="ml-2 text-xs font-bold text-white">
                  Good start
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-5 text-xs leading-5 text-slate-400">
            <span className="mb-2 block h-2 w-2 rounded-full bg-[#5d9b72] shadow-[0_0_0_4px_rgba(93,155,114,0.14)]" />
            Private conversation space
          </div>
        </aside>

        <section className="flex min-h-[calc(100vh-120px)] min-w-0 flex-col overflow-hidden rounded-3xl border border-(--connections-line) bg-white shadow-[0_24px_70px_rgba(23,32,51,0.1)]">
          <header className="flex items-center gap-3 border-b border-(--connections-line) px-4 py-4 sm:px-6">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-2xl bg-[#e6eef7] ring-2 ring-(--connections-coral) ring-offset-2">
              <img
                src={withUser?.photoUrl}
                alt={withUser?.firstName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-(--connections-coral)">
                Connected
              </p>
              <h1 className="truncate text-xl font-black text-(--connections-ink) sm:text-2xl">
                {withUser?.firstName} {withUser?.lastName}
              </h1>
            </div>
            <span className="hidden items-center gap-2 text-xs font-bold text-(--connections-muted) md:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#5d9b72]" />
              Online now
            </span>
            <span className="hidden rounded-full bg-[#e8f3eb] px-3 py-1.5 text-xs font-bold text-[#39704c] sm:inline-flex">
              Active connection
            </span>
          </header>

          <div className="flex-1 space-y-5 overflow-y-auto bg-[#fbfcfd] bg-[linear-gradient(rgba(35,79,130,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(35,79,130,.025)_1px,transparent_1px)] bg-size-[28px_28px] p-4 sm:p-6">
            {messages && messages.length > 0 ? (
              messages.map(({ firstName, lastName, text, senderId }, index) => {
                const isCurrentUser = user.firstName === firstName;
                return (
                  <div
                    key={index}
                    className={`flex items-end gap-2 ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isCurrentUser && (
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-xl bg-[#e6eef7]">
                        <img
                          alt={firstName}
                          src={withUser?.photoUrl}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] wrap-break-word rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[70%] sm:text-base ${isCurrentUser ? "rounded-br-md bg-(--connections-coral) text-white" : "rounded-bl-md border border-(--connections-line) bg-white text-(--connections-ink)"}`}
                    >
                      {!isCurrentUser && (
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider opacity-70">
                          {firstName} {lastName || ""}
                        </p>
                      )}
                      {text}
                    </div>
                    {isCurrentUser && (
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-xl bg-[#f5e7df]">
                        <img
                          alt={user?.firstName}
                          src={user?.photoUrl}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex h-full min-h-95 items-center justify-center px-6 text-center">
                <div>
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#f5e7df] text-2xl">
                    💬
                  </div>
                  <h2 className="mt-5 text-xl font-black text-(--connections-ink)">
                    Start something thoughtful
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-(--connections-muted)">
                    Say hello to {withUser?.firstName} and see where the
                    conversation takes you.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-(--connections-line) bg-white p-3 sm:p-5">
            <div className="mb-3 flex items-center justify-between px-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-(--connections-muted)">
                New message
              </span>
              <span className="text-xs text-(--connections-muted)">
                Keep it genuine <span className="text-[#b84432]">✦</span>
              </span>
            </div>
            <div className="flex items-end gap-2 rounded-2xl border border-(--connections-line) bg-[#f8fafb] p-2 focus-within:border-(--connections-blue) focus-within:ring-3 focus-within:ring-(--connections-blue)/10">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Write a thoughtful message..."
                aria-label="Message"
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-(--connections-ink) outline-none placeholder:text-[#8791a0] sm:text-base"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                aria-label="Send message"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-(--connections-coral) text-white shadow-[0_8px_18px_rgba(184,68,50,0.2)] transition hover:bg-[#9f3829] disabled:bg-[#c8ced5] disabled:text-[#687385] disabled:shadow-none"
              >
                <svg
                  className="h-5 w-5"
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
              </button>
            </div>
            <p className="mt-2 px-2 text-xs text-(--connections-muted)">
              Press Enter to send
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
