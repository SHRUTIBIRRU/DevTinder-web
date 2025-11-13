import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [showSignUp, setShowSignup] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // signup flow + api integration => E2E testing
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
    } catch (err) {
      setError(err?.response.data || "Something went wrong");
      console.log("Error:", err);
    }
  };

  const handleSignup = async () => {
    //once api  call=> userData shold return + token should be set and user should be redirected to profile
    try {
      const res = await axios.post(`${BASE_URL}/signup`, formData, {
        withCredentials: true,
      });

      dispatch(addUser(res?.data.data));
      navigate("/profile");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body items-start text-left">
          {!showSignUp ? (
            <>
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
            </>
          ) : (
            <>
              <h2 className="font-medium mb-1"> FirstName</h2>
              <input
                type="text"
                placeholder="Enter firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className="input input-secondary w-full mb-4"
              />{" "}
              <h2 className="font-medium mb-1">LastName</h2>
              <input
                type="text"
                placeholder="Enter lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                }
                className="input input-secondary w-full mb-4"
              />{" "}
              <h2 className="font-medium mb-1">Email Id</h2>
              <input
                type="text"
                placeholder="Enter EmailId"
                value={formData.emailId}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, emailId: e.target.value }))
                }
                className="input input-secondary w-full mb-4"
              />{" "}
              <h2 className="font-medium mb-1"> Password</h2>
              <input
                type="text"
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                className="input input-secondary w-full mb-4"
              />
            </>
          )}
          <p className="text-red-500">{error}</p>
          <div className="card-actions flex justify-center my-5 w-full">
            <button
              className="btn btn-primary text-xl w-1/2"
              onClick={showSignUp ? handleSignup : handleLogin}
            >
              {showSignUp ? "Signup" : "Login"}
            </button>
          </div>
          <p
            className="text-cyan-300 cursor-pointer"
            onClick={() => setShowSignup((value) => !value)}
          >
            {showSignUp
              ? `Already have an account? Login here`
              : `New User? Signup here`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
