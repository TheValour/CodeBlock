import React, { useContext, useEffect, useState } from 'react';
import AddFriends from './AddFriends';
import { AuthContext } from '../../context/AuthContext';
import {collection, DocumentData, getDocs} from 'firebase/firestore';
import { db } from '../auth/firebase';
import UserProfile from './UserProfile';
import FriendList from './FriendList';

type RoomUserProps = {
  currUser: {
    name: string;
    ranking: string; 
    avatar: string; 
    username: string; 
    country: string | null;
    gitHub: string | null;
    twitter: string | null;
    linkedIN: string | null;
    website: string | null;
  };
}

const RoomUser: React.FC<RoomUserProps> = ({ currUser }) => {
  // console.log(user)
  const [friendList, setFriendList] = useState<DocumentData[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadFriends() {
      try {
        if (user && user.uid) {
          const docRef = collection(db, "userfriend", user.uid, "friends"); // Reference to the collection
          const querySnapshot = await getDocs(docRef);
  
          if (!querySnapshot.empty) {
            const friends = querySnapshot.docs.map(doc => doc.data()); // Map through documents and get data
            setFriendList(friends); // Set data in state as an array
            console.log("list data friend : ", friendList);
            console.log("Friends list:", friends);
          } else {
            console.log("No friends found!");
            setFriendList([]); // Set an empty array if no friends are found
          }
        } else {
          console.log("User is not defined or missing UID.");
        }
      } catch (e) {
        console.error("Error fetching documents: ", e);
        setFriendList([]); // In case of an error, ensure friendList is an empty array
      }
    }
    loadFriends();
  }, [user, db]);

  return (
    <div className='flex w-screen justify-between H90'>
      <UserProfile currUser={currUser}/>
      <AddFriends />
      
      <FriendList friendList={friendList}/>
    </div>
  );
};

export default RoomUser;
