import {ContestProfile } from "../constant/type";
import Calendar from "./Calendar";

type HeroProps = {
  contest: ContestProfile; 
  uid : string | undefined
}

export default function Hero({ contest, uid }: HeroProps) {
    console.log(contest)
  return (
    <div className="h-screen bg-green-300 w-11/12">
      <div>
        <p>contest attentend</p>
        {contest.contestAttend}
      </div>
      <div>
        <p className="text-blue-700">{Math.round(contest.contestRating)}</p>
        <p>Contest Rating</p>
      </div>
      <div>
        <p className="text-blue-700">{contest.contestGlobalRanking}</p>
        <p>Contest Global Rating</p>
      </div>
      <Calendar uid={uid}/>
    </div>
  );
}
