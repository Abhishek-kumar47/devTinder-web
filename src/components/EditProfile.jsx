import { useState } from "react"
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [error, setError] = useState();
    const [showToast,setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        //clear Error
        setError("");
        try{
            const res = await axios.patch(BASE_URL+ "/profile/edit",
                {
                firstName,
                lastName,
                age,
                gender,
                about,
                photoUrl
            },{withCredentials:true}
        );
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
        setTimeout(() =>{
            setShowToast(false);
        }, 3000);
        }
        catch(err){
            setError(err.response.data);
        }
    }
  return (
    <>
    <div className="flex justify-center my-10">
    <div className="flex justify-center mx-10">
      <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">Edit Profile</h2>
    <div>
    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">First Name</span>
  </div>
  <input
   type="text"
   placeholder="Type here" 
   value={firstName}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setFirstName(e.target.value)}
   />

</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Last Name</span>
  </div>
  <input
   type="text"
   placeholder="Type here" 
   value={lastName}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setLastName(e.target.value)}
   />

</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Photo URL</span>
  </div>
  <input
   type="text"
   placeholder="Type here" 
   value={photoUrl}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setPhotoUrl(e.target.value)}
   />

</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Age</span>
  </div>
  <input
   type="text"
   placeholder="Type here" 
   value={age}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setAge(e.target.value)}
   />

</label>
<label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Gender</span>
            </div>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled value="">
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">About</span>
  </div>
  <input
   type="text"
   placeholder="Type here" 
   value={about}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setAbout(e.target.value)}
   />

</label>
    </div>
    <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
    </div>
  </div>
</div>
    </div>
    <UserCard user={{firstName,lastName,age,gender,about,photoUrl}}/>
    </div>
{ showToast && (<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile saved successfully!!</span>
  </div>
</div> )
}
    </>
  )
}

export default EditProfile
