import Calendar from "./hero/Calendar"; 
import Rating from "./hero/Rating";
import Solved from "./hero/Solved";
import Question from "./hero/Question";

export default function Hero() {
  
  return (
    <div className="BGGRAY w-11/12 border my-12 rounded-xl flex flex-col items-center">
      <Rating/>
      <Calendar/>
      <Solved/>
      <Question/>
    </div>
  );
}
