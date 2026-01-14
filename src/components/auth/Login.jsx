import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../utils/userSlice/userReducer";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("virat@gmail.com");
  const [password, setPassword] = useState("virat@123");

  const handleLoginReqest = () => {
    if (user) return;
    dispatch(loginUser({ email, password }));
  };

  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="flex justify-center mt-6 lg:mt-16">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login Here</h2>
          <div className="flex flex-col gap-y-3 mt-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Type here"
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
      </div>
    </div>
  );
};
