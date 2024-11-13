import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { db } from "../auth/firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { APIContext } from "../../context/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

interface FriendsListProps {
  friendList: DocumentData[]; // Define the prop type as an array of DocumentData
}
interface User {  
  name: string;
  avatar: string;
  contestRating: number;
  contestAttend: number;
  lastUpdate: number;
}

const FriendsList: React.FC<FriendsListProps> = ({ friendList }) => {
  friendList = friendList.sort((a, b) => b.contestRating - a.contestRating);
  
  const { user } = useContext(AuthContext);
  const { findUser, userContests, checkUserExists } = useContext(APIContext);
  
  async function updateFriend(userUid: string, friendId: string, updatedData: Partial<User>) {
    try {
        const friendDocRef = doc(db, "userfriend", userUid, "friends", friendId);
        await updateDoc(friendDocRef, updatedData);
        console.log("Friend updated successfully:", friendId);
    } catch (e) {
        console.error("Error updating friend: ", e);
    }
  }

  async function clickHandler(friendId: string) { 
    try {
      const res = await findUser(friendId);
      const {avatar} = res.data;

      console.log(res.data);
      console.log("Friend ID: ", friendId);

      if (checkUserExists(res.data) && user && user.uid) {
        const response = await userContests(friendId);
        const {contestRating, contestAttend} = response.data;

        updateFriend(user.uid, friendId, {
          contestAttend: contestAttend?contestAttend:0,
          contestRating : contestRating?contestRating:0,
          avatar,
          "lastUpdate": Date.now(),
        });
      } else {
        console.log("User or UID is not defined.");
      }            
    } catch (e) { 
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="bg-red-400 p-10 w-1/2 flex flex-col">
      <div className="flex justify-evenly bg-gray-300 my-2 p-2 rounded items-center">
        <span className="w-1/12 text-center">Rank</span>
        <span className="w-1/12 text-center">Profile</span> 
        <span className="w-1/6 text-center">Name</span> 
        <span className="text-blue-600">Rarting</span>
        <span className="text-green-600 w-1/12 text-center">Total Contest</span>
      </div>

      {Array.isArray(friendList) && friendList.length > 0 ? (
        friendList.map((friend, index) => (
            <div className="flex justify-evenly bg-gray-300 my-2 p-2 rounded items-center relative">
            <span className="rounded-full bg-yellow-300 size-6 text-center">{index + 1}</span>
            <img src={friend.avatar} alt="profile" className="size-16"/>
            <span key={index} className="w-1/6">{friend.name}</span> 
            <span className="text-blue-600">{Math.round(friend.contestRating)}</span>
            <span className="text-green-600">{friend.contestAttend}</span>

            {(Date.now() - friend.lastUpdate > 1 * 24 * 60 * 60 * 1000) && 
              <FontAwesomeIcon icon={faWrench} className="absolute right-2 cursor-pointer" onClick={() => clickHandler(friend.name)}/>
            }
            </div>
        ))
      ) : (
        <li>No friends found.</li>
      )}
    </div>
  );
};
  
export default FriendsList;
  