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
    <>
      <div className="flex justify-center mt-6 lg:mt-16 mb-10 lg:mb-20">
        <div className="card bg-base-200 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="text-2xl font-semibold text-center">
              Create An Account
            </h2>
            <div className="flex flex-col gap-y-3 mt-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Dev"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Chauhan"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
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
              <button className="btn btn-primary" onClick={handleRegister}>
                Signup
              </button>
            </div>
          </div>
          <Link to="/login" className="text-center text-blue-500 text-sm mb-4">
            👈 Already have an account? Login
          </Link>
        </div>
      </div>
    </>
  );
};
