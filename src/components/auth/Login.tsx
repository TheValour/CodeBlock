import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.js";

export default function Login() {
  const [userMail, setUserMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {user, signIn} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e : any) => {
    console.log(userMail, password);
    e.preventDefault();
    try {
      await signIn(userMail, password);
      if(user) {
        navigate('/main');
      }      
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error during sign-in:", errorCode, errorMessage, error);
    }
  };

  return (
    <div className="w-full h-full FLEX bg-green-100">
      <div className="bg-gray-200 p-6 rounded-md shadow-md w-2/6 h-1/2">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login Account</h2>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-4">
            <label htmlFor="email" className="label-class">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userMail}
              placeholder="Enter your email"
              onChange={(e) => setUserMail(e.target.value)}
              className="input-class"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="label-class">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="input-class"
            />
          </div>
          <div className="mt-12">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
            <span className="text-gray-600 ml-5 text-sm">
              Don&apos;t have an account? <Link to={"/signup"} className="text-blue-500">Signup</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
