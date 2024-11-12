import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {auth} from './firebase.ts'
import { createClient } from "@supabase/supabase-js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
// const supabase = createClient("https://kydeedknficgzzfvfiiy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5ZGVlZGtuZmljZ3p6ZnZmaWl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3NTU4NzEsImV4cCI6MjA0NDMzMTg3MX0.6mWS5SAuAXZ56LKdcs1lwN-G7rbMwjyncOEvUKm0GwM");

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUser] = useState<string>('');
  const [image, setImage] = useState<any | null>();

  const handleError = (err : any) =>
    toast.error(err, {
      position: "top-right",
  });
  const handleSuccess = (msg : any) =>
    toast.success(msg, {
      position: "top-right",
  });

  const handleSubmit = async (e : any) => {
    console.log(email, password);
    e.preventDefault();
    
    try {
      // const imageName = Date.now();
      const uniqueImageName = `${Date.now()}-${image.name}`;
      const res = await supabase.storage.from('CODEBLOCK').upload(`public/${uniqueImageName}`, image);
      console.log(res);
      const { data } = supabase.storage.from('CODEBLOCK').getPublicUrl(`public/${uniqueImageName}`);
      const publicURL = data.publicUrl;
      console.log(publicURL);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if(auth.currentUser) {
        await updateProfile(auth.currentUser, {displayName: username, photoURL : publicURL})
        const user = userCredential.user;
        console.log("User signed in:", user);
        handleSuccess('User successfully register');
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error: any) {
      handleError(error.code)
      console.error("Error during sign-in:\n", error.code);
    }
  };

  return (
    <div className="w-full h-full FLEX bg-green-100">
      <div className="p-6 bg-gray-200 shadow-md rounded-md w-2/6 h-11/12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Signup Account</h2>
        <form  className="mt-8">
          <div className="mb-4">
            <label htmlFor="email" className="label-class">
              Email
            </label>
            <input
              type="email"
              name="email"  autoComplete="current-email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="input-class"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="label-class">
              Username
            </label>
            <input
              type="text" autoComplete="current-username"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUser(e.target.value)}
              className="input-class"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image_input" className="label-class">Profile Image:</label>
            <input type="file" autoComplete="current-image"
              name="tags" id="image_input"
              accept=".jpg, .jpeg, .png"
              onChange={(e: any) => setImage(e.target.files[0])}
              className='bg-slate-100 p-2 input-class' required
            /><br/> 
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
              required  autoComplete="current-password"
            />
          </div>
          <div className="mt-12">
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
            <span className="text-gray-600 ml-5 text-sm">
              Already have an account? <Link to={"/login"} className="text-blue-500">Login</Link>
            </span>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;