import { useDispatch, useSelector } from "react-redux";
import { Link, Links, useNavigate } from "react-router-dom";
import { logout } from "../redux/users/userSlice";
import { logoutUser } from "../redux/users/userReducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  };

  const closeDropdown = () => {
    document.activeElement?.blur();
  };

  return (
    <div className="navbar bg-base-300 shadow-md sticky top-0 z-50 px-4 md:px-6">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-lg md:text-xl font-bold hover:bg-base-200"
        >
          💼 CodeBuddy
        </Link>
      </div>
      <div className="flex gap-2 md:gap-4">
        {user && (
          <div className="flex items-center gap-2 md:gap-4">
            <p className="hidden sm:inline text-sm md:text-base font-medium">
              {displayName}
            </p>
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold capitalize tracking-wide ${membershipBadge.className}`}
              title={`${membershipBadge.label} membership`}
            >
              <span aria-hidden="true">{membershipBadge.icon}</span>
              {membershipBadge.label}
            </span>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-base-200"
              >
                <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2">
                  <img
                    alt={user?.firstName}
                    src={user.photoUrl}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                onClick={closeDropdown}
                className="dropdown-content menu menu-compact bg-base-100 rounded-lg z-50 mt-3 w-48 p-2 shadow-lg"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    <span>👤 Profile</span>
                    <span className="badge badge-sm badge-primary">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">
                    <span>🤝 Connections</span>
                  </Link>
                </li>
                <li>
                  <Link to="/premium">
                    <span>👑 Premium</span>
                  </Link>
                </li>
                <li>
                  <Link to="/requests">
                    <span>📥 Requests</span>
                  </Link>
                </li>
                <li>
                  <Link to="/reset-password">
                    <span>🔐 Reset Password</span>
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout} className="text-error">
                    <span>🚪 Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
