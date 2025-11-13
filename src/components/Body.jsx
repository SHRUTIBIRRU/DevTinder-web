import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    if (userData) return;
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      {/* Content area should expand to fill available space */}
      <div className="flex-grow">
        <Outlet />
      </div>
      {/* Footer sticks to bottom */}
      <Footer />
    </div>
  );
};

export default Body;
