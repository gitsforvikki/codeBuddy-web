import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Links } from "react-router-dom";
import { BASE_URL } from "../constant";
import { logout } from "../utils/userSlice/userSlice";
import { logoutUser } from "../utils/userSlice/userReducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const handleLogout = async () => {
    dispatch(logoutUser());
  };
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Devtinder
        </Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="flex items-center gap-x-2">
            <p>{user?.firstName}</p>
            <div className="dropdown dropdown-end mr-6">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
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
