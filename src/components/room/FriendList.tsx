import { DocumentData } from "firebase/firestore";

interface FriendsListProps {
  friendList: DocumentData[]; // Define the prop type as an array of DocumentData
}
  
const FriendsList: React.FC<FriendsListProps> = ({ friendList }) => {
  friendList = friendList.sort((a, b) => b.contestRating - a.contestRating);

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
          <div className="flex justify-evenly bg-gray-300 my-2 p-2 rounded items-center">
            <span className="rounded-full bg-yellow-300 size-6 text-center">{index + 1}</span>
            <img src={friend.avatar} alt="profile" className="size-16"/>
            <span key={index} className="w-1/6">{friend.name}</span> 
            <span className="text-blue-600">{Math.round(friend.contestRating)}</span>
            <span className="text-green-600">{friend.contestAttend}</span>
          </div>
        ))
      ) : (
        <li>No friends found.</li>
      )}
    </div>
  );
};
  
export default FriendsList;
  