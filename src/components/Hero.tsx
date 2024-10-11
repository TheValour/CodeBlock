import Calendar from "./hero/Calendar"; 
import Rating from "./hero/Rating";
import Solved from "./hero/Solved";
import Question from "./hero/Question";

export default function Hero() {
  
  return (
    <div className="h-screen BGGRAY w-11/12 flex flex-col items-center">
      <Rating/>
      <Calendar/>
      <Solved/>
      <Question/>
    </div>
  );
}
