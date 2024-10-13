import { useState } from "react";
import { Link } from "react-router-dom";

import {auth, storage} from './firebase.ts'

import { v4 as uuidv4 } from 'uuid';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUser] = useState<string>('');
  const [image, setImage] = useState<any | null>();



  const handleSubmit = async (e : any) => {
    console.log(email, password);
    e.preventDefault();
    
    try {
      const imageRef = storageRef(storage, uuidv4());
      const snapshot = await uploadBytes(imageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if(auth.currentUser) {
        await updateProfile(auth.currentUser, {displayName: username, photoURL : url})
        const user = userCredential.user;
        console.log("User signed in:", user);
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error during sign-in:", errorCode, errorMessage, error);
    }
  };

  return (
    <div className="w-full h-full FLEX bg-green-100">
      <div className="p-6 bg-gray-200 shadow-md rounded-md w-2/6 h-11/12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Signup Account</h2>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-4">
            <label htmlFor="email" className="label-class">
              Email
            </label>
            <input
              type="email"
              name="email"
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
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUser(e.target.value)}
              className="input-class"
              required
            />
          </div>
          <label>Image:</label><br/>
        <input type="file" onChange={(e: any) => setImage(e.target.files[0])}
          name="tags" className='w-4/5 bg-slate-200 p-2' required/><br/> 
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
              required
            />
          </div>
          <div className="mt-12">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
            <span className="text-gray-600 ml-5 text-sm">
              Already have an account? <Link to={"/login"} className="text-blue-500">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;