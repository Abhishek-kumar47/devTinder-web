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
    if(feed) return ;
    const res = await axios.get(BASE_URL + "/user/feed",{withCredentials:true});
    dispatch(addFeed(res.data));
  }
  
  useEffect(() =>{
    getFeed();
  },[])
  return (
 feed && ( <div className="flex justify-center my-10">
      <UserCard user = {feed.data[0]}/>
    </div>)
  )
}

export default Feed
