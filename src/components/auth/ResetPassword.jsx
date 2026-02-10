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
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8">
      <div className="w-full max-w-sm md:max-w-md">
        {/* Header Card */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Secure Your Account
          </h1>
          <p className="text-base-content/70 mt-2">
            Reset your password safely
          </p>
        </div>

        {/* Reset Password Card */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body gap-4 p-4 md:p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Reset Password
            </h2>

            <div className="divider m-0" />

            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">
                  Current Password
                </legend>
                <input
                  type="password"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="••••••••"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">
                  New Password
                </legend>
                <input
                  type="password"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label className="text-xs text-base-content/60 mt-1">
                  Use at least 8 characters for better security
                </label>
              </fieldset>
            </div>

            {/* Reset Button */}
            <button
              className="btn btn-primary btn-block btn-lg mt-2"
              onClick={handleResetPassword}
              disabled={!oldPassword || !newPassword}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              Reset Password
            </button>

            <div className="divider m-0" />

            {/* Password Tips */}
            <div className="bg-base-300 p-3 rounded-lg">
              <p className="text-xs font-semibold mb-2">Security Tips:</p>
              <ul className="text-xs space-y-1 text-base-content/70">
                <li>✓ Use uppercase and lowercase letters</li>
                <li>✓ Include numbers and special characters</li>
                <li>✓ Avoid using personal information</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Login Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-base-content/70">
            Remember your password?{" "}
            <Link to="/login" className="link link-primary font-semibold">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
