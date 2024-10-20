import React from 'react';
import Friends from './Friends';

interface RoomUserProps {
  user: {
    name: string;
    ranking: string; 
    avatar: string; 
    username: string; 
  };
}

const RoomUser: React.FC<RoomUserProps> = ({ user }) => {
    console.log(user)
  return (
    <div className='flex'>
        <div className="h-screen bg-blue-400 text-white w-1/5 FLEX flex-col">
            <div>
                <img src={user.avatar} alt={user.name} />
                <span className="block w-full text-center font-bold text-xl">@ {user.name}</span>
            </div>
            <div>
                <p className="w-full text-center text-blue-700 text-2xl">{user.ranking} </p>
                <p className="w-full text-center ">Overall Rating</p>
            </div>
        </div>
        <div>
           <Friends/>
        </div>
    </div>
  );
};

export default RoomUser;
