import { useContext, useState } from "react";
import { APIContext } from "../../context/api";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../auth/firebase";
import { AuthContext } from "../../context/AuthContext";

export default function AddProfile() {
    const { user } = useContext(AuthContext);
    const { findUser, checkUserExists } = useContext(APIContext);
    const [userProfileId, setUserProfileId] = useState('');
    
    async function clickHandler() {
        console.log(userProfileId);
        try {
            const res = await findUser(userProfileId);
            console.log(res.data);
            const {name, ranking, username, avatar, gitHub, country, linkedIN, website, twitter} = res.data;

            if (checkUserExists(res.data) && user && user.uid) {
                await setDoc(doc(db, "users", user.uid, "profiles", userProfileId), {
                    name,
                    ranking,
                    username,
                    avatar,
                    country,
                    gitHub,
                    twitter,
                    linkedIN,
                    website: website.length > 0 ? website[0] : null,
                });
                
                console.log("Document written with ID: ", user.uid); 
            } else {
                console.log("User or UID is not defined.");
            }            
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

  return (
    <div className="H90 bg-gray-200">
        <div className="w-1/4 bg-blue-200 h-full FLEX flex-col text-lg">
            <h2>Connect <span className="text-green-600">LC</span> Account</h2>
            <input type="text" 
                name="" id="" className='rounded-lg h-8 p-2' 
                value={userProfileId} 
                onChange={e => setUserProfileId(e.target.value)}
                />
            <button onClick={clickHandler} className="bg-orange-300 rounded-md mt-3 p-2">+ Add</button>
        </div>
    </div>
  )
}
