import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";


const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);


  const getFeed = async () => {
    if (feed) return;
    
    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      // console.log("Feed API Response:", res.data); // Debugging log
      dispatch(addFeed(res.data)); // Pass the whole response
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };
  
  
  useEffect(() =>{
    getFeed();
  },[]);
  if (!Array.isArray(feed) || feed.length === 0)
    return <h1 className="flex justify-center my-10">No new users found!</h1>;
  
  return (
 feed && ( <div className="flex justify-center my-10">
     <UserCard user={feed[0]} />

    </div>)
  )
}

export default Feed
