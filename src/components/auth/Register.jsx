import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/userSlice/userReducer";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    dispatch(registerUser({ firstName, lastName, email, password }));
  };
  const { success } = useSelector((state) => state.user);

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success]);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8">
      <div className="w-full max-w-sm md:max-w-md">
        {/* Header Card */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">👋</div>
          <h1 className="text-3xl md:text-4xl font-bold">Welcome!</h1>
          <p className="text-base-content/70 mt-2">
            Join our developer community
          </p>
        </div>

        {/* Registration Card */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body gap-4 p-4 md:p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Create Account
            </h2>

            <div className="divider m-0" />

            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">
                  First Name
                </legend>
                <input
                  type="text"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">
                  Last Name
                </legend>
                <input
                  type="text"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>

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
                />
                <label className="text-xs text-base-content/60 mt-1">
                  At least 8 characters for security
                </label>
              </fieldset>
            </div>

            {/* Sign Up Button */}
            <button
              className="btn btn-primary btn-block btn-lg mt-2"
              onClick={handleRegister}
              disabled={!firstName || !lastName || !email || !password}
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Create Account
            </button>

            {/* Terms */}
            <p className="text-xs text-center text-base-content/60">
              By signing up, you agree to our{" "}
              <a href="#" className="link link-primary">
                Terms of Service
              </a>
            </p>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-base-content/70">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-semibold">
              Sign in →
            </Link>
          </p>
        </div>

        {/* Why Join */}
        <div className="mt-10">
          <h3 className="text-sm font-semibold mb-4 text-center">
            Why Join CodeBuddy?
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-lg">🌟</span>
              <div>
                <p className="text-xs font-semibold">Find Your Match</p>
                <p className="text-xs text-base-content/60">
                  Connect with like-minded developers
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🚀</span>
              <div>
                <p className="text-xs font-semibold">Grow Together</p>
                <p className="text-xs text-base-content/60">
                  Collaborate on exciting projects
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">💼</span>
              <div>
                <p className="text-xs font-semibold">Build Network</p>
                <p className="text-xs text-base-content/60">
                  Expand your professional circle
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
