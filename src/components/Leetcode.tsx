import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { APIContext } from "../context/api";
import { User } from "../constant/type";
import Sidebar from "./Sidebar";
import Hero from "./Hero";

function Leetcode() {
  const [user, setUser] = useState<User>({} as User);
  const {uid} = useParams();
  const  {findUser, setUid} = useContext(APIContext);
  setUid(uid?uid:"");
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await findUser(uid || ''); 
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  
  }, [uid, findUser]);

  return (
    <div className='w-screen h-screen bg-slate-300 flex'>
      <Sidebar user={user}/>
      <Hero />
    </div>
  )
}
  
export default Leetcode;
  