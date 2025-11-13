import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  //api called, create slice, store connections

  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const getConnection = async () => {
    if (requests.length > 0) return;
    try {
      const response = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(response?.data.data));
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    getConnection();
  }, []);

  const reviewRequests = async (status, id) => {
    try {
       await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequests(id));
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className="mx-50">
      <div className="p-4 text-3xl tracking-wide">Requests</div>
      {requests.length > 0 ? (
        requests.map((user) => (
          <ul
            key={user?.fromUserId._id}
            className="list bg-base-100 rounded-box shadow-md"
          >
            <li className="list-row bg-base-300 my-2">
              <div>
                <img
                  className="size-20 rounded-full"
                  src={
                    user?.photoUrl ||
                    "https://img.daisyui.com/images/profile/demo/1@94.webp"
                  }
                />
              </div>
              <div>
                <div className="text-2xl text-blue-500">
                  {user?.fromUserId.firstName} {user?.fromUserId.LastName}
                </div>
                {user?.fromUserId.age && user?.fromUserId.gender && (
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {user?.fromUserId.age}, {user?.fromUserId.gender}
                  </div>
                )}
              </div>
              <p className="list-col-wrap text-xl">{user?.fromUserId.about}</p>
              <div className="">
                <button
                  className="btn btn-primary"
                  onClick={() => reviewRequests("accepted", user?._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary ml-2"
                  onClick={() => reviewRequests("rejected", user?._id)}
                >
                  Reject
                </button>
              </div>
            </li>
          </ul>
        ))
      ) : (
        <div className="text-xs ml-5"> No Connections Found!</div>
      )}
    </div>
  );
};

export default Requests;
