import { User } from "../constant/type";
type SidebarProps = {
  user: User; 
}

export default function Sidebar({ user }: SidebarProps) {
  return (
    <div className="h-screen BGGRAY text-white w-1/5 FLEX flex-col">
      <div>
        <img src={user.avatar} alt={user.name} />
        <span className="block w-full text-center font-bold text-xl">@ {user.name}</span>
      </div>
      <div>
        <p className="w-full text-center text-blue-700 text-2xl">{user.ranking} </p>
        <p className="w-full text-center ">Overall Rating</p>
      </div>
      <p className="text-orange-400">Country: {user.country}</p>
    </div>
  );
}
