import { useContext, useState } from "react";
import { APIContext } from "../../context/api";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../auth/firebase";
import { AuthContext } from "../../context/AuthContext";

export default function AddFriends() {
    const { user } = useContext(AuthContext);
    const { findUser, userContests } = useContext(APIContext);
    const [userProfileId, setUserProfileId] = useState('');
    
    function checkUserExists(response : any) {
        if (response.errors && response.errors.some((error : any) => error.message.includes('user does not exist')) || response.matchedUser === null) {
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
            const {avatar} = res.data;

            if (checkUserExists(res.data) && user && user.uid) {
                const userFriendsRef = collection(db, "userfriend", user.uid, "friends");
                console.log(userFriendsRef)
                // Get the number of documents (friends) for the current user
                const friendsSnapshot = await getDocs(userFriendsRef);
                const friendCount = friendsSnapshot.size;
    
                // If the user has less than 10 friends, add the new friend
                if (friendCount < 10) {
                    const res = await userContests(userProfileId);
                    console.log("total checking ", res.data);
                    const {contestRating, contestAttend} = res.data;
                    
                    // Assuming userFriendsRef points to the Firestore collection for friends
                    await setDoc(doc(userFriendsRef, userProfileId), {
                        name: userProfileId,
                        avatar,
                        contestAttend: contestAttend?contestAttend:0,
                        contestRating : contestRating?contestRating:0 // Set the friendsData in the document
                    });
                                        
                    setUserProfileId('');
                    console.log("Document written with ID: ", userProfileId);
                    return true; // Return true if friend is added
                } else {
                    alert("Cannot add more friends. Maximum limit of 5 reached.");
                    setUserProfileId('');
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
    async function deleteFriend() {
        if (user && user.uid) {
            const userFriendsRef = collection(db, "userfriend", user.uid, "friends");
            const friendDocRef = doc(userFriendsRef, userProfileId);
            
            try {
                await deleteDoc(friendDocRef);
                console.log(`Friend with userProfileId: ${userProfileId} has been deleted.`);
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        }
    }
    
  return (
    <div className="bg-green-300 FLEX flex-col p-10 w-1/4 gap-2">
        <input type="text" 
            name="" id="" className='rounded-lg h-8 p-2' 
            value={userProfileId} 
            onChange={e => setUserProfileId(e.target.value)}
        />
        <button onClick={clickHandler} className="border border-white p-2 px-3 rounded-md"> + Add</button>
        <button onClick={deleteFriend} className="bg-red-300 p-2 rounded-md"> - Delete</button>
    </div>
  )
}
