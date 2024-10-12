import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { APIContext } from "../context/api";
import { User } from "../constant/type";
import Sidebar from "./Sidebar";
import Hero from "./Hero";

function Leetcode() {
  // const navigate = useNavigate();
  const [user, setUser] = useState<User>({} as User);
  const {uid} = useParams();
  const  {findUser, setUid} = useContext(APIContext);
  setUid(uid?uid:"");
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await findUser(uid || ''); 
        setUser(res.data);

        // if(res.status && res.data.name === "") {
        //   navigate('/');
        //   alert("Not found");
        // }
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
  