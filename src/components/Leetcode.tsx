import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { APIContext } from "../context/api";
import { ContestProfile, User } from "../constant/type";
import Sidebar from "./Sidebar";
import Hero from "./Hero";

function Leetcode() {
  
  const [user, setUser] = useState<User>({} as User);
  const [contest, setContest] = useState<ContestProfile>({} as ContestProfile);
  const {uid} = useParams();
  const  {findUser, userContests, setUid} = useContext(APIContext);
  setUid(uid?uid:"");
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await findUser(uid || ''); 
        const con = await userContests(uid || '');
        setUser(res.data);
        setContest(con.data);

        console.log(con.data); 
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  
  }, [uid, findUser]);

  return (
    <div className='w-screen h-screen bg-slate-300 flex'>
      <Sidebar user={user}/>
      <Hero contest={contest} uid={uid}/>
    </div>
  )
}
  
export default Leetcode;
  