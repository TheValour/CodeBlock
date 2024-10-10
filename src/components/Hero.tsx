import Rating from "./hero/Rating";
import Calendar from "./hero/Calendar";
import Solved from "./hero/Solved";
import Question from "./hero/Question";

export default function Hero() {
  
  return (
    <div className="h-screen bg-green-300 w-11/12">
      <Rating/>
      <Calendar/>
      <Solved/>
      <Question/>
    </div>
  );
}
