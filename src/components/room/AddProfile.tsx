import { useContext, useState } from "react";
import { APIContext } from "../../context/api";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../auth/firebase";
import { AuthContext } from "../../context/AuthContext";

export default function AddProfile() {
    const { user } = useContext(AuthContext);
    const { findUser } = useContext(APIContext);
    const [userProfileId, setUserProfileId] = useState('');
    
    function checkUserExists(response : any) {
        if (response.errors && response.errors.some(error => error.message.includes('user does not exist')) || response.matchedUser === null) {
          console.log('User does not exist.');
          return false; // User not found
        }
      
        if (response.username) {
          console.log('User found:', response.username);
          return true; // User found
        }
      
        console.log('Unknown response.');
        return false;
    }
    async function clickHandler() {
        try {
            const res = await findUser(userProfileId);
            console.log(res.data);
            const {name, ranking, username, avatar} = res.data;

            if (checkUserExists(res.data) && user && user.uid) {
                const docRef = await setDoc(doc(db, "users", user.uid), {
                    name,
                    ranking,
                    username,
                    avatar
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
    <div>
        <input type="text" 
            name="" id="" className='rounded-lg h-8 p-2' 
            value={userProfileId} 
            onChange={e => setUserProfileId(e.target.value)}
        />
        <button onClick={clickHandler}>Add</button>
    </div>
  )
}
