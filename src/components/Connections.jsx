import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  //api called, create slice, store connections

  const connections = useSelector((state) => state.connections);
  const dispatch = useDispatch();

  const getConnection = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });

      dispatch(addConnection(response?.data.data));
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    getConnection();
  }, []);

  if (!connections) return;

  //if (connections.length === 0) return <div>No connections Found</div>;

  return (
    <div className="mx-50">
      <div className="p-4 text-3xl tracking-wide">Connections</div>
      {connections?.length > 0 ? (
        connections.map((user) => (
          <ul key={user._id} className="list bg-base-100 rounded-box shadow-md">
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
                  {user.firstName} {user.LastName}
                </div>
                {user.age && user.gender && (
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {user?.age}, {user.gender}
                  </div>
                )}
              </div>
              <p className="list-col-wrap text-xl">{user?.about}</p>
            </li>
          </ul>
        ))
      ) : (
        <div className="text-xs ml-5"> No Connections Found!</div>
      )}
    </div>
  );
};

export default Connections;
