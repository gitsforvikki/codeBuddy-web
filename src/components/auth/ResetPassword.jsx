import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/auth/reset-password`,
        {
          oldPassword,
          newPassword,
        },
        { withCredentials: true },
      );
      console.log("res:- " + res);
      if (res.status === 200) {
        toast.success("Password reset successfully.");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center mt-6 lg:mt-16 mb-10 lg:mb-20">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
          <div className="flex flex-col gap-y-3 mt-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Old Password</legend>
              <input
                type="password"
                className="input"
                placeholder="oldPassword@123"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">New Password</legend>
              <input
                type="text"
                className="input"
                placeholder="newPassword@xyz"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center mt-3">
            <button className="btn btn-primary" onClick={handleResetPassword}>
              Reset Password
            </button>
          </div>
        </div>
        <Link to="/signup" className="text-center text-blue-500 text-sm mb-4">
          👉 New user? Create an account
        </Link>
      </div>
    </div>
  );
};
