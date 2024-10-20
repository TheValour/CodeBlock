import { useContext, useState } from "react";
import { APIContext } from "../../context/api";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../auth/firebase";
import { AuthContext } from "../../context/AuthContext";

export default function Friends() {
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
    
            if (checkUserExists(res.data) && user && user.uid) {
                const userFriendsRef = collection(db, "userfriend", user.uid, "friends");
    
                // Get the number of documents (friends) for the current user
                const friendsSnapshot = await getDocs(userFriendsRef);
                const friendCount = friendsSnapshot.size;
    
                // If the user has less than 10 friends, add the new friend
                if (friendCount < 5) {
                    const newFriendRef = await setDoc(doc(userFriendsRef, userProfileId), {name : userProfileId});
    
                    console.log("Document written with ID: ", userProfileId);
                    return true; // Return true if friend is added
                } else {
                    console.log("Cannot add more friends. Maximum limit of 10 reached.");
                    return false; // Return false if friend limit reached
                }
            } else {
                console.log("User or UID is not defined.");
            }
        } catch (e) {
            console.error("Error adding document: ", e);
            return false; // Return false on error
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
