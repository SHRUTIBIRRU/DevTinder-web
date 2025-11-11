import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("elon@gmail.com");
  const [password, setPassword] = useState("Elon@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
      console.log("res", res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body items-start text-left">
          <h2 className="font-medium mb-1">Email Id</h2>
          <input
            type="text"
            placeholder="Enter EmailId"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="input input-secondary w-full mb-4"
          />
          <h2 className="font-medium mb-1">Password</h2>
          <input
            type="text"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            className="input input-secondary w-full"
          />
          <div className="card-actions flex justify-center my-5 w-full">
            <button
              className="btn btn-primary text-xl w-1/2"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
