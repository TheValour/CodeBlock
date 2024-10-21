
type RoomUserProps = {
    currUser: {
      name: string;
      ranking: string; 
      avatar: string; 
      username: string; 
    };
}

const UserProfile: React.FC<RoomUserProps> = ({ currUser }) => {
    return (
    <div className="bg-blue-400 text-white w-1/4 FLEX flex-col">
        <div>
          <img src={currUser.avatar} alt={currUser.name} />
          <span className="block w-full text-center font-bold text-xl">@ {currUser.name}</span>
        </div>
        <div>
          <p className="w-full text-center text-blue-700 text-2xl">{currUser.ranking} </p>
          <p className="w-full text-center ">Overall Rating</p>
        </div>
      </div>
  )
}
export default UserProfile;
