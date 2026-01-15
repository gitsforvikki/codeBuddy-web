import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../utils/userSlice/userReducer";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginReqest = () => {
    if (user) return;
    dispatch(loginUser({ email, password }));
  };

  const { user, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="flex justify-center mt-6 lg:mt-16 mb-10 lg:mb-20">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center">Welcome Back 👋</h2>
          <div className="flex flex-col gap-y-3 mt-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="email"
                className="input"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="password@123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center mt-3">
            <button className="btn btn-primary" onClick={handleLoginReqest}>
              Login
            </button>
          </div>
        </div>
        <Link to="/signup" className="text-center text-blue-500 text-sm mb-4">
          👉 New user? Create an account
        </Link>
        <div className="text-center mb-4">
          {error ? (
            <Link to="" className="text-sm italic underline">
              Forgot Password
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};
