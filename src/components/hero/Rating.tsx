import { useContext, useEffect, useState } from "react";
import { APIContext } from "../../context/api";
import { ContestProfile } from "../../constant/type";

export default function Rating() {
    const  {uid, userContests} = useContext(APIContext);
    const [contest, setContest] = useState<ContestProfile>({} as ContestProfile);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await userContests(uid || ''); 
            setContest(res.data);
    
            console.log(res.data); 
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };
        fetchUser();
      
    }, [uid, userContests]);

    if(!contest) return <></>;

  return (
    <div className="bg-gray-800 p-4 w-full flex justify-evenly">
      <div className="FLEX flex-col bg-gray-900 text-yellow-50 rounded-md p-3">
        <p>{contest.contestAttend}</p>
        <p className="text-sm">contest attentend</p>
      </div>
      <div className="FLEX flex-col bg-gray-900 text-yellow-50 rounded-md p-3">
        <p className="text-blue-700">{Math.round(contest.contestRating)}</p>
        <p className="text-sm">Contest Rating</p>
      </div>
      <div className="FLEX flex-col bg-gray-900 text-yellow-50 rounded-md p-3">
        <p className="text-blue-700">{contest.contestGlobalRanking}</p>
        <p className="text-sm">Contest Global Rating</p>
      </div>
    </div>
  )
}
