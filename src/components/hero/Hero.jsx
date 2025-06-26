import Calendar from "./Calendar"; 
import Rating from "./Rating";
import Solved from "./Solved";
import Question from "./Question";

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
