import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { APIContext } from "../context/api";
import Sidebar from "./hero/Sidebar";
import Hero from "./hero/Hero";

function Leetcode() {
  // const navigate = useNavigate();
  const [user, setUser] = useState({});
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
    <div className='w-screen BGGRAY flex'>
      <Sidebar user={user}/>
      <div className="BGGRAY w-11/12 FLEX p-2">
        <Hero />
      </div>
    </div>
  )
}
  
export default Leetcode;
