import { User } from "../constant/type";
type SidebarProps = {
  user: User; 
}

export default function Sidebar({ user }: SidebarProps) {
  return (
    <div className="h-screen bg-blue-400 w-1/5 FLEX flex-col">
      <div>
        <img src={user.avatar} alt={user.name} />
        <span className="block w-full text-center">{user.name}</span>
      </div>
      <div>
        <p className="w-full text-center  text-2xl">{user.ranking} </p>
        <p className="w-full text-center text-blue-700">Overall Rating</p>

      </div>
      <p>Country: {user.country}</p>
    </div>
  );
}
