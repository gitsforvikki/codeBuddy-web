import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/users/userReducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const user = useSelector((state) => state.user.user);
  const displayName = user?.firstName
    ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
    : "";

  const membership = user?.membershipType?.toLowerCase() || "normal";
  const membershipBadge = {
    normal: {
      label: "Normal",
      icon: "○",
      className: "border-base-content/20 bg-base-200 text-base-content/70",
    },
    silver: {
      label: "Silver",
      icon: "◆",
      className:
        "border-slate-300/70 bg-gradient-to-r from-slate-100 to-slate-300 text-slate-700 shadow-sm",
    },
    gold: {
      label: "Gold",
      icon: "✦",
      className:
        "border-amber-300/70 bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-300 text-amber-900 shadow-sm",
    },
  }[membership] || {
    label: membership,
    icon: "◆",
    className: "border-primary/30 bg-primary/10 text-primary",
  };

  const handleLogout = async () => {
    dispatch(logoutUser());
    navigate("/login");
    setAccountMenuOpen(false);
  };

  const toggleAccountMenu = () => {
    setAccountMenuOpen((open) => !open);
  };

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!accountMenuRef.current?.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-(--connections-line) bg-white/95 shadow-[0_6px_24px_rgba(23,32,51,0.07)] backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-(--connections-ink) text-lg font-black text-white shadow-[0_8px_18px_rgba(23,32,51,0.18)] transition-transform group-hover:-rotate-6">
              C
            </span>
            <span className="text-base font-black tracking-tight text-(--connections-ink) sm:text-lg">
              CodeBuddy
            </span>
          </Link>

          {user && (
            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Desktop navigation"
            >
              <Link
                to="/"
                className="rounded-xl px-3 py-2 text-sm font-bold text-(--connections-muted) transition-colors hover:bg-[#f5e7df] hover:text-(--connections-coral)"
              >
                Discover
              </Link>
              <Link
                to="/connections"
                className="rounded-xl px-3 py-2 text-sm font-bold text-(--connections-muted) transition-colors hover:bg-[#f5e7df] hover:text-(--connections-coral)"
              >
                Connections
              </Link>
              <Link
                to="/requests"
                className="rounded-xl px-3 py-2 text-sm font-bold text-(--connections-muted) transition-colors hover:bg-[#f5e7df] hover:text-(--connections-coral)"
              >
                Requests
              </Link>
              <Link
                to="/premium"
                className="ml-2 rounded-xl bg-(--connections-ink) px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-(--connections-blue)"
              >
                ✦ Go premium
              </Link>
            </nav>
          )}

          <div className="-mr-1 flex items-center gap-2 sm:mr-0 sm:gap-3">
            {user && (
              <>
                <div ref={accountMenuRef} className="relative">
                  <button
                    type="button"
                    className="btn btn-ghost btn-circle avatar h-12 w-12 p-1 hover:bg-[#f3f5f6]"
                    aria-label="Open profile menu"
                    aria-haspopup="menu"
                    aria-controls="account-menu"
                    aria-expanded={accountMenuOpen}
                    onClick={toggleAccountMenu}
                  >
                    <div className="w-10 rounded-full ring-2 ring-(--connections-coral) ring-offset-2">
                      <img
                        alt={user?.firstName}
                        src={user.photoUrl}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </button>
                  {accountMenuOpen && (
                    <div
                      id="account-menu"
                      role="menu"
                      className="absolute right-0 top-[calc(100%+0.75rem)] z-60 w-60 rounded-2xl border border-(--connections-line) bg-white p-2 shadow-[0_18px_40px_rgba(23,32,51,0.16)]"
                    >
                      <div className="mb-2 border-b border-(--connections-line) px-3 pb-3">
                        <p className="text-sm font-extrabold text-(--connections-ink)">
                          {displayName}
                        </p>
                        <p className="mt-1 text-xs text-(--connections-muted)">
                          {membershipBadge.label} member
                        </p>
                      </div>
                      <nav
                        aria-label="Account navigation"
                        className="grid gap-1"
                      >
                        <Link
                          to="/profile"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-(--connections-ink) hover:bg-[#f5e7df]"
                        >
                          <span>👤 Profile</span>
                          <span className="badge badge-sm badge-primary">
                            New
                          </span>
                        </Link>
                        <Link
                          to="/premium"
                          onClick={() => setAccountMenuOpen(false)}
                          className="rounded-xl px-3 py-2.5 text-sm font-bold text-(--connections-ink) hover:bg-[#f5e7df]"
                        >
                          👑 Premium
                        </Link>
                        <Link
                          to="/connections"
                          onClick={() => setAccountMenuOpen(false)}
                          className="rounded-xl px-3 py-2.5 text-sm font-bold text-(--connections-ink) hover:bg-[#f5e7df]"
                        >
                          🤝 Connections
                        </Link>
                        <Link
                          to="/requests"
                          onClick={() => setAccountMenuOpen(false)}
                          className="rounded-xl px-3 py-2.5 text-sm font-bold text-(--connections-ink) hover:bg-[#f5e7df]"
                        >
                          📥 Requests
                        </Link>
                        <Link
                          to="/reset-password"
                          onClick={() => setAccountMenuOpen(false)}
                          className="rounded-xl px-3 py-2.5 text-sm font-bold text-(--connections-ink) hover:bg-[#f5e7df]"
                        >
                          🔐 Reset password
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="mt-1 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-error hover:bg-red-50"
                        >
                          🚪 Logout
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
