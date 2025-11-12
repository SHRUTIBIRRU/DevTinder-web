import React, { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import InputComponent from "./InputComponent";

const EditProfile = ({ user }) => {
  //make form component which contains user detials
  //save btn should call patch api for user/profile
  //usercard should show live editing

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, about, gender, photoUrl },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data);
      console.log("err", err);
    }
  };
  if (user) {
    return (
      <div className="flex justify-around my-10">
        <div className="flex justify-center ">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body items-start text-left">
              <InputComponent
                name="FirstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <InputComponent
                name="LastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <InputComponent
                name="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <InputComponent
                name="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
              <InputComponent
                name="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
              <InputComponent
                name="PhotoUrl"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
              <p className="text-red-500">{error}</p>
              <div className="card-actions flex justify-center my-5 w-full">
                <button
                  className="btn btn-primary text-xl w-1/2"
                  onClick={saveProfile}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, about, gender, photoUrl }}
        />
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile saved successfully.</span>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default EditProfile;
