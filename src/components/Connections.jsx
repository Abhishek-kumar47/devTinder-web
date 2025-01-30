import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            });

            dispatch(addConnection(res.data.data));
        } catch (err) {
            console.error("Error while fetching connections", err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []); // Add dependency array to prevent infinite loop

    if (!connections) return <h1 className="flex justify-center my-10">Loading...</h1>;
    if (connections.length === 0) return <h1 className="flex justify-center my-10">No Connections Found</h1>;

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connections</h1>
            {connections.map((connection) => {
                const { firstName, lastName, photoUrl, age, gender, about, _id } = connection;
                return (
                    <div key={_id} className="flex items-center bg-gray-900 shadow-lg rounded-lg max-w-xl mx-auto p-6 my-4">
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
                        <p className="text-gray-300">{about}</p>
                    </div>
                </div>
                
                );
            })}
        </div>
    );
};

export default Connections;
