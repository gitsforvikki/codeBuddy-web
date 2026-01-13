import { useState } from "react";
import axios from "axios";

export const LoginPage = () => {
  const [email, setEmail] = useState("rohit@gmail.com");
  const [password, setPassword] = useState("rohit@123");

  const handleLoginReqest = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true } //for set cookie in the broswer
      );
    } catch (err) {
      console.error(err);
    }
  };
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
