import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createSocketConnection } from "../../utils/socket/socket";
import { ChatShimmer } from "../simmerUi/ShimmerUi";
import { getAllConnection } from "../../redux/connections/connectionReducer";
import { ROUTES } from "../../utils/routes";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatMessageTime = (dateString) => {
  if (!dateString) {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const isOnlyEmoji = (str) => {
  if (!str || typeof str !== "string") return false;
  const trimmed = str.trim();
  if (!trimmed) return false;
  // Clean skin tone modifiers, variation selectors, zero-width joiners
  const cleaned = trimmed.replace(/[\uFE00-\uFE0F\u200D\u{1F3FB}-\u{1F3FF}]/gu, "");
  const emojiRegex = /^(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\s)+$/u;
  return emojiRegex.test(cleaned) && !/[a-zA-Z0-9\p{P}]/u.test(cleaned);
};

const ICEBREAKERS = [
  "👋 Hey! Excited to connect with you on CodeBuddy.",
  "💻 What tech stack or projects are you currently working on?",
  "🚀 Would love to explore collaborating on an idea together!",
  "☕ Always happy to exchange engineering tips and ideas.",
];

export const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { withUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const [showEmojiBar, setShowEmojiBar] = useState(false);

  const { user } = useSelector((state) => state.user);
  const loggedInUserId = user?._id;

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { connections, loading: connectionsLoading } = useSelector(
    (state) => state.connection,
  );

  // Safe MongoDB ObjectId comparison
  const withUser = connections?.find(
    (each) => each._id?.toString() === withUserId?.toString(),
  );

  // Auto-scroll to latest message
  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (!connections) {
      dispatch(getAllConnection());
    }
  }, [connections, dispatch]);

  // If no withUserId is provided in the URL, automatically select the first connection
  useEffect(() => {
    if (!withUserId && connections && connections.length > 0) {
      navigate(`/chat/${connections[0]._id}`, { replace: true });
    }
  }, [withUserId, connections, navigate]);

  // Socket Connection and Event Handling
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

    const handleMessage = ({ firstName, lastName, text, senderId, createdAt }) => {
      setMessages((prev) => [
        ...prev,
        {
          firstName,
          lastName,
          text,
          senderId,
          createdAt: createdAt || new Date().toISOString(),
        },
      ]);
    };

    socket.on("messageReceived", handleMessage);

    return () => {
      socket.off("messageReceived", handleMessage);
    };
  }, [loggedInUserId, withUserId, user?.firstName]);

  // Cleanup socket on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // Fetch Chat History
  const fetchChat = async () => {
    if (!withUserId) return;
    try {
      setLoadingChat(true);
      const chat = await axios.get(`${BASE_URL}/chat/getchat/${withUserId}`, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages?.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          senderId: senderId?._id || senderId,
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          photoUrl: senderId?.photoUrl,
          text,
          createdAt,
        };
      }) || [];

      setMessages(chatMessages);
    } catch (err) {
      console.error("Failed to load chat history:", err);
    } finally {
      setLoadingChat(false);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [withUserId]);

  // Auto-scroll on new message
  useEffect(() => {
    scrollToBottom("smooth");
  }, [messages, loadingChat]);

  // Send message handler
  const sendMessage = (textToSend = newMessage) => {
    const trimmed = textToSend.trim();
    if (!trimmed || !socketRef.current || !loggedInUserId || !withUserId) return;

    socketRef.current.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      loggedInUserId,
      withUserId,
      text: trimmed,
    });

    setNewMessage("");
    inputRef.current?.focus();
  };

  const handleSelectIcebreaker = (icebreakerText) => {
    setNewMessage(icebreakerText);
    inputRef.current?.focus();
  };

  const handleInsertEmoji = (emoji) => {
    setNewMessage((prev) => prev + emoji);
    inputRef.current?.focus();
  };

  const handleInsertCodeBlock = () => {
    setNewMessage((prev) => `${prev}\n\`\`\`javascript\n// write code snippet here\n\`\`\`\n`);
    inputRef.current?.focus();
  };

  // Filter connections for sidebar
  const filteredConnections = connections?.filter((c) => {
    const fullName = `${c?.firstName || ""} ${c?.lastName || ""}`.toLowerCase();
    const skills = (c?.skills || []).join(" ").toLowerCase();
    const term = searchTerm.toLowerCase().trim();
    return fullName.includes(term) || skills.includes(term);
  }) || [];

  if (connectionsLoading && !connections) {
    return <ChatShimmer />;
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-(--connections-cream) px-2 py-3 sm:px-4 sm:py-6 md:px-8">
      <div className="mx-auto flex h-[calc(100vh-100px)] max-w-7xl overflow-hidden rounded-3xl border border-(--connections-line) bg-white shadow-[0_20px_60px_rgba(23,32,51,0.08)]">
        
        {/* ── LEFT PANE: Conversations Sidebar ── */}
        <aside
          className={`flex w-full flex-col border-r border-(--connections-line) bg-[#fbfcfd] transition-all md:w-80 lg:w-96 ${
            withUserId ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Sidebar Header */}
          <div className="border-b border-(--connections-line) bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#fff3f0] text-lg text-(--connections-coral)">
                  💬
                </span>
                <div>
                  <h1 className="text-lg font-black tracking-tight text-(--connections-ink)">
                    Messages
                  </h1>
                  <p className="text-[11px] font-bold text-(--connections-muted)">
                    {connections?.length || 0} active {connections?.length === 1 ? "connection" : "connections"}
                  </p>
                </div>
              </div>
              <Link
                to={ROUTES.CONNECTIONS}
                className="rounded-xl border border-(--connections-line) bg-[#f8fafb] px-3 py-1.5 text-xs font-bold text-(--connections-ink) transition-colors hover:border-(--connections-coral) hover:text-(--connections-coral)"
                title="View All Connections"
              >
                + New
              </Link>
            </div>

            {/* Search Input */}
            <div className="relative mt-3">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" strokeWidth="2" />
                  <path strokeLinecap="round" strokeWidth="2" d="m16.5 16.5 4.5 4.5" />
                </svg>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search buddies or skills..."
                className="h-10 w-full rounded-xl border border-(--connections-line) bg-[#f8fafb] pl-9 pr-3 text-xs text-(--connections-ink) placeholder:text-slate-400 focus:border-(--connections-coral) focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto p-2">
            {filteredConnections.length > 0 ? (
              <div className="space-y-1">
                {filteredConnections.map((buddy) => {
                  const isActive = buddy._id?.toString() === withUserId?.toString();
                  const isGold = buddy.membershipType?.toLowerCase() === "gold";
                  const isSilver = buddy.membershipType?.toLowerCase() === "silver";

                  return (
                    <button
                      key={buddy._id}
                      onClick={() => navigate(`/chat/${buddy._id}`)}
                      className={`group flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-all ${
                        isActive
                          ? "bg-white shadow-[0_8px_20px_rgba(184,68,50,0.12)] ring-1.5 ring-(--connections-coral)"
                          : "hover:bg-white/80 hover:shadow-2xs"
                      }`}
                    >
                      {/* Avatar with beacon */}
                      <div className="relative shrink-0">
                        <div className="h-12 w-12 overflow-hidden rounded-2xl bg-[#e6eef7] ring-2 ring-white">
                          <img
                            src={buddy.photoUrl || "https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"}
                            alt={buddy.firstName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h2 className="truncate text-sm font-black text-(--connections-ink) group-hover:text-(--connections-coral)">
                            {buddy.firstName} {buddy.lastName}
                          </h2>
                          {isGold && (
                            <span className="shrink-0 rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-black text-amber-800">
                              👑 Gold
                            </span>
                          )}
                          {isSilver && (
                            <span className="shrink-0 rounded-md bg-slate-200 px-1.5 py-0.5 text-[10px] font-black text-slate-700">
                              ✦ Silver
                            </span>
                          )}
                        </div>

                        {/* Top Skills Preview */}
                        <div className="mt-1 flex items-center gap-1 overflow-hidden">
                          {buddy.skills && buddy.skills.length > 0 ? (
                            <span className="truncate text-[11px] font-semibold text-(--connections-muted)">
                              {buddy.skills.slice(0, 2).join(" • ")}
                            </span>
                          ) : (
                            <span className="truncate text-[11px] text-slate-400">
                              Connected buddy
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="text-3xl">🔍</span>
                <p className="mt-3 text-xs font-bold text-(--connections-ink)">
                  No buddies found
                </p>
                <p className="mt-1 text-[11px] text-(--connections-muted)">
                  Try a different search term or connect with more developers.
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* ── RIGHT PANE: Active Chat ── */}
        <section
          className={`flex min-w-0 flex-1 flex-col bg-white ${
            !withUserId ? "hidden md:flex" : "flex"
          }`}
        >
          {withUser ? (
            <>
              {/* Active Chat Header */}
              <header className="flex h-18 items-center justify-between border-b border-(--connections-line) bg-white/95 px-4 shadow-2xs backdrop-blur sm:px-6">
                <div className="flex items-center gap-3">
                  {/* Mobile Back Button */}
                  <button
                    onClick={() => navigate("/chat")}
                    className="grid h-9 w-9 place-items-center rounded-xl border border-(--connections-line) bg-[#f8fafb] text-slate-600 md:hidden"
                    title="Back to conversation list"
                  >
                    ←
                  </button>

                  {/* Avatar & Presence */}
                  <div className="relative">
                    <div className="h-11 w-11 overflow-hidden rounded-2xl bg-[#e6eef7] ring-2 ring-(--connections-coral) ring-offset-2">
                      <img
                        src={withUser?.photoUrl || "https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"}
                        alt={withUser?.firstName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 animate-pulse" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-base font-black text-(--connections-ink) sm:text-lg">
                        {withUser?.firstName} {withUser?.lastName}
                      </h1>
                      {withUser?.isPremium && (
                        <span className="rounded-full bg-amber-50 border border-amber-300 px-2 py-0.5 text-[10px] font-black text-amber-800">
                          {withUser?.membershipType || "PRO"}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-(--connections-muted)">
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Online
                      </span>
                      <span>•</span>
                      <span className="truncate max-w-[200px] sm:max-w-none">
                        {withUser?.skills?.slice(0, 3).join(", ") || "Developer"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    to={ROUTES.CONNECTIONS}
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-(--connections-line) bg-[#f8fafb] px-3.5 py-2 text-xs font-bold text-(--connections-ink) transition-colors hover:border-(--connections-coral) hover:text-(--connections-coral)"
                  >
                    🤝 All Connections
                  </Link>
                </div>
              </header>

              {/* Chat Messages Body */}
              <div className="flex-1 space-y-4 overflow-y-auto bg-[#fafbfc] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px] p-4 sm:p-6">
                
                {/* Session Intro Card */}
                <div className="mx-auto mb-6 max-w-sm rounded-2xl border border-slate-200/80 bg-white/80 p-3.5 text-center text-xs text-(--connections-muted) shadow-2xs backdrop-blur">
                  <p className="font-bold text-(--connections-ink)">
                    🔒 Encrypted Session with {withUser?.firstName}
                  </p>
                  <p className="mt-0.5 text-[11px]">
                    Messages are delivered directly in real-time. Keep conversations respectful and inspiring.
                  </p>
                </div>

                {messages && messages.length > 0 ? (
                  messages.map((msg, index) => {
                    // Check if sender matches current logged-in user
                    const isSender =
                      (msg.senderId && msg.senderId.toString() === loggedInUserId?.toString()) ||
                      msg.firstName === user?.firstName;

                    const formattedTime = formatMessageTime(msg.createdAt);

                    return (
                      <div
                        key={index}
                        className={`flex items-end gap-2.5 ${
                          isSender ? "justify-end" : "justify-start"
                        }`}
                      >
                        {/* Partner Avatar */}
                        {!isSender && (
                          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-xl bg-[#e6eef7] shadow-xs ring-1 ring-slate-200">
                            <img
                              alt={msg.firstName || withUser?.firstName}
                              src={withUser?.photoUrl || "https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}

                        <div
                          className={`group flex flex-col ${
                            isSender ? "items-end" : "items-start"
                          } max-w-[85%] sm:max-w-[75%] md:max-w-[68%]`}
                        >
                          {isOnlyEmoji(msg.text) ? (
                            <div className="py-1 text-4xl sm:text-5xl select-none leading-none drop-shadow-xs transition-transform hover:scale-110">
                              {msg.text}
                            </div>
                          ) : (
                            <div
                              className={`relative w-fit min-w-[80px] sm:min-w-[100px] break-words [overflow-wrap:anywhere] px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-[15px] leading-relaxed shadow-xs transition-shadow ${
                                isSender
                                  ? "rounded-2xl rounded-br-xs bg-gradient-to-br from-(--connections-coral) to-[#9f3829] text-white shadow-[0_4px_14px_rgba(184,68,50,0.18)]"
                                  : "rounded-2xl rounded-bl-xs border border-slate-200/90 bg-white text-(--connections-ink) shadow-[0_2px_8px_rgba(23,32,51,0.04)]"
                              }`}
                            >
                              {!isSender && (
                                <p className="mb-1 text-[10px] font-black uppercase tracking-wider text-(--connections-coral)">
                                  {msg.firstName}
                                </p>
                              )}

                              {/* Code snippet detection */}
                              {msg.text?.startsWith("```") ? (
                                <pre className="overflow-x-auto rounded-xl bg-slate-900 p-3 font-mono text-xs text-emerald-400">
                                  {msg.text.replace(/```[a-z]*/g, "").trim()}
                                </pre>
                              ) : (
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                              )}
                            </div>
                          )}

                          {/* Message Metadata (Timestamp & Checkmark) */}
                          <div
                            className={`mt-1 flex items-center gap-1.5 px-1 text-[10px] font-bold text-slate-400 ${
                              isSender ? "flex-row-reverse" : "flex-row"
                            }`}
                          >
                            <span>{formattedTime}</span>
                            {isSender && (
                              <span className="text-(--connections-coral)" title="Delivered">
                                ✓✓
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Current User Avatar */}
                        {isSender && (
                          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-xl bg-[#f5e7df] shadow-xs ring-1 ring-slate-200">
                            <img
                              alt={user?.firstName}
                              src={user?.photoUrl || "https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  /* Empty state with Icebreakers */
                  <div className="my-auto flex flex-col items-center justify-center py-10 text-center">
                    <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-[#fff3f0] to-[#fde8e4] text-3xl shadow-xs">
                      💬
                    </div>
                    <h2 className="mt-4 text-xl font-black text-(--connections-ink)">
                      Break the ice with {withUser?.firstName}
                    </h2>
                    <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-(--connections-muted)">
                      No messages here yet. Choose a conversation starter below or write your own note!
                    </p>

                    {/* Icebreaker Prompts */}
                    <div className="mt-6 flex max-w-md flex-col gap-2">
                      {ICEBREAKERS.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => handleSelectIcebreaker(prompt)}
                          className="rounded-xl border border-(--connections-line) bg-white px-4 py-2.5 text-left text-xs font-bold text-(--connections-ink) shadow-2xs transition-all hover:border-(--connections-coral) hover:bg-[#fff9f8] hover:text-(--connections-coral)"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Composer / Input Footer */}
              <footer className="relative border-t border-(--connections-line) bg-white p-3 sm:p-4">
                
                {/* Quick Emoji Reaction Pill Bar */}
                {showEmojiBar && (
                  <div className="mb-2 flex items-center gap-1.5 rounded-2xl border border-(--connections-line) bg-[#f8fafb] p-2">
                    {["👋", "🚀", "🔥", "💡", "💻", "🎉", "🤝", "⚡", "❤️"].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleInsertEmoji(emoji)}
                        className="grid h-8 w-8 place-items-center rounded-lg text-lg transition-transform hover:scale-125 hover:bg-white"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {/* Emoji Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowEmojiBar(!showEmojiBar)}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-(--connections-line) bg-[#f8fafb] text-lg text-slate-600 transition-colors hover:border-(--connections-coral) hover:bg-white hover:text-(--connections-coral)"
                    title="Insert emoji"
                  >
                    😊
                  </button>

                  {/* Code Snippet Button */}
                  <button
                    type="button"
                    onClick={handleInsertCodeBlock}
                    className="hidden sm:grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-(--connections-line) bg-[#f8fafb] font-mono text-xs font-bold text-slate-600 transition-colors hover:border-(--connections-coral) hover:bg-white hover:text-(--connections-coral)"
                    title="Insert code snippet"
                  >
                    &lt;/&gt;
                  </button>

                  {/* Message Input Box */}
                  <div className="relative flex flex-1 items-center rounded-2xl border border-(--connections-line) bg-[#f8fafb] px-3.5 focus-within:border-(--connections-coral) focus-within:bg-white focus-within:ring-4 focus-within:ring-(--connections-coral)/10">
                    <input
                      ref={inputRef}
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder={`Message ${withUser?.firstName || ""}...`}
                      className="h-12 w-full bg-transparent text-sm text-(--connections-ink) placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>

                  {/* Send Button */}
                  <button
                    type="button"
                    onClick={() => sendMessage()}
                    disabled={!newMessage.trim()}
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-(--connections-coral) text-white shadow-[0_8px_20px_rgba(184,68,50,0.25)] transition-all hover:scale-105 hover:bg-[#9f3829] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:hover:scale-100"
                    title="Send Message"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.2"
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-slate-400">
                  <span>Press <kbd className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">Enter ↵</kbd> to send</span>
                  <span className="hidden sm:inline">CodeBuddy Secure Direct Messaging</span>
                </div>
              </footer>
            </>
          ) : (
            /* No conversation selected state */
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="grid h-20 w-20 place-items-center rounded-3xl bg-(--connections-cream) text-4xl shadow-xs">
                🤝
              </div>
              <h2 className="mt-5 text-2xl font-black text-(--connections-ink)">
                Your Conversations
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-(--connections-muted)">
                Select a developer buddy from the sidebar to view your messages, share ideas, and start collaborating.
              </p>
              <Link
                to={ROUTES.CONNECTIONS}
                className="btn mt-6 h-11 rounded-xl border-0 bg-(--connections-coral) px-6 text-sm font-bold text-white hover:bg-[#9f3829]"
              >
                Browse Connections
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ChatPage;
