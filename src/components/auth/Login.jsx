import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../utils/userSlice/userReducer";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, error } = useSelector((state) => state.user);

  const handleLoginReqest = () => {
    if (user) return;
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8">
      <div className="w-full max-w-sm md:max-w-md">
        {/* Header Card */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">💼</div>
          <h1 className="text-3xl md:text-4xl font-bold">Devtinder</h1>
          <p className="text-base-content/70 mt-2">
            Connect with developers worldwide
          </p>
        </div>

        {/* Login Card */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body gap-4 p-4 md:p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Welcome Back 👋
            </h2>

            <div className="divider m-0" />

            {/* Error Alert */}
            {error && (
              <div className="alert alert-error text-sm">
                <svg
                  className="stroke-current shrink-0 h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4v2m0 4v2M7.08 6.47A9.002 9.002 0 1020.92 17.53"
                  ></path>
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">
                  Email Address
                </legend>
                <input
                  type="email"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLoginReqest()}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">
                  Password
                </legend>
                <input
                  type="password"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLoginReqest()}
                />
              </fieldset>
            </div>

            {/* Login Button */}
            <button
              className="btn btn-primary btn-block btn-lg mt-2"
              onClick={handleLoginReqest}
              disabled={!email || !password}
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign In
            </button>

            {/* Forgot Password */}
            {error && (
              <div className="text-center">
                <Link
                  to="/reset-password"
                  className="link link-secondary text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-base-content/70">
            New to Devtinder?{" "}
            <Link to="/signup" className="link link-primary font-semibold">
              Create an account →
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="text-center text-sm">
            <div className="text-2xl mb-1">🌐</div>
            <p className="text-xs text-base-content/60">Global Network</p>
          </div>
          <div className="text-center text-sm">
            <div className="text-2xl mb-1">💬</div>
            <p className="text-xs text-base-content/60">Easy Chat</p>
          </div>
          <div className="text-center text-sm">
            <div className="text-2xl mb-1">✅</div>
            <p className="text-xs text-base-content/60">Verified Members</p>
          </div>
          <div className="text-center text-sm">
            <div className="text-2xl mb-1">🔒</div>
            <p className="text-xs text-base-content/60">Secure & Safe</p>
          </div>
        </div>
      </div>
    </div>
  );
};
