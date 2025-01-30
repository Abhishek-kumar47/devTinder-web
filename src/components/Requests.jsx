import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const reviewRequest = async (status,_id) => {
       try{
        const res= await axios.post(BASE_URL+ "/request/review/"+ status + "/" + _id,{},{
            withCredentials: true,
        });
        dispatch(removeRequest(_id));
    }catch(err){
        console.error("Error reviewing request", err);
    }
    };

    const fetchrequest = async () => {
       try{ 
        const res= await axios.get(BASE_URL+ "/user/request/received",{
            withCredentials: true,
        });
        dispatch(addRequest(res.data.data));
    }catch(err){
        console.error("Error fetching requests", err);
    }
    };

    useEffect(() => {
        fetchrequest();
    },[]);
    if (!requests) return <h1 className="flex justify-center my-10">Loading...</h1>;
    if (requests.length === 0) return <h1 className="flex justify-center my-10">No Requests yet</h1>;

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Requests</h1>
            {requests.map((request) => {
                const { firstName, lastName, photoUrl, age, gender, about, _id } = request.fromUserId;
                return (
                    <div key={_id} className="flex justify-between items-center bg-gray-900 shadow-lg rounded-lg max-w-xl mx-auto p-6 my-4">
                    <div>
                        <img 
                            alt="User profile" 
                            className="w-16 h-16 rounded-full border-2 border-white" 
                            src={photoUrl || "https://via.placeholder.com/150"} 
                        />
                    </div>
                    <div className="ml-8 text-left">
                        <h2 className="text-white font-semibold text-xl">{firstName + " " + lastName}</h2>
                        {age && gender && <p className="text-gray-400">{age + ", " + gender}</p>}
                        <p className="text-gray-300 ">{about}</p>
                    </div>
                    <div>
                       <button className="btn btn-primary mx-2" onClick={() => reviewRequest("accepted",request._id)}>Accept</button>
                       <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("rejected",request._id)}>Reject</button>
                    </div>
                </div>
                
                );
            })}
        </div>
    );
}

export default Requests
