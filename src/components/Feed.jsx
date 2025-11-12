import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../utils/feedSlice";

const Feed = () => {
  //make api call and add feed to the redux store

  const feed = useSelector((state) => state.feed);
  const [feedData, setFeedData] = useState(feed || []);
  const dispatch = useDispatch();

  const getFeedData = async () => {
    if (feed) return;
    try {
      const response = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });

      setFeedData(response?.data.data);
      dispatch(addFeedData(response?.data.data));
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    getFeedData();
  }, []);

  return (
    <div className="flex justify-center my-10">
      {feedData.length > 0 && <UserCard user={feedData[0]} />}
    </div>
  );
};
export default Feed;
