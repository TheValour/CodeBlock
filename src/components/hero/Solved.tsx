import { useContext, useEffect, useState } from "react";
import { APIContext } from "../../context/api";

// Define a type for the question structure
type Question = {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissionNum: any,
  acSubmissionNum: any
}

export default function Solved() {
  const { uid, userQuestions } = useContext(APIContext); 
  const [question, setQuestion] = useState<Question | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true); // Start loading
        const res = await userQuestions(uid || ''); 
        setQuestion(res.data);
        console.log("Fetched data:", res.data); 
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to fetch user data."); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchUser();
  }, [uid, userQuestions]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!question) return <div>No question data available.</div>;

  return (
    <div className="bg-gray-800 p-4 w-full flex justify-evenly">
      <div className="FLEX flex-col bg-gray-900 text-yellow-50 rounded-md p-3">
        <span>{question.solvedProblem} / 3000</span>
        <span >All Problems</span>
      </div>
      <div className="FLEX flex-col bg-gray-900 text-yellow-50 rounded-md p-3">
        <span>{question.easySolved} / 700</span>
        <span className="text-green-500">Easy</span>
      </div>
      <div className="FLEX flex-col bg-gray-900 text-yellow-50 rounded-md p-3">
        <span>{question.mediumSolved} / 700</span>
        <span className="text-orange-500">Medium</span>
      </div>
      <div className="FLEX flex-col bg-gray-900 text-yellow-50 rounded-md p-3">
        <span>{question.hardSolved} / 400</span>
        <span className="text-red-500">Hard</span>
      </div>
    </div>
  );
}
