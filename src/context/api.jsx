import { createContext, useState } from "react";
import axios from 'axios';

// API base URL
// const API = 'https://alfa-leetcode-api.onrender.com';
const API = 'https://leetcode-api-pied.vercel.app';

const defaultValue = {
  findUser: async () => { throw new Error('Not define'); },
  userContests: async () => { throw new Error('Not define'); },
  userCalendar: async () => { throw new Error('Not define'); },
  userQuestions: async () => { throw new Error('Not define'); },
  checkUserExists: () => { throw new Error('Not define'); },
  uid : '',
  setUid: ()=>{}
};

// Provide default value or initial state for the context
export const APIContext = createContext(defaultValue);

export function APIContextProvider({ children }) {
  const [uid, setUid] = useState("hello");

  const findUser = async (user) => {
    const response = await axios.get(`${API}/${user}`); 
    console.log("API Response:", response.data); // Log the response data for debugging
    return response;
  };
  const userContests = async (user) => {
    const response = await axios.get(`${API}/${user}/contest`);
    return response;
  };
  const userCalendar = async (user, year) => {
    const response = await axios.get(`${API}/userProfileCalendar?username=${user}&year=${year}`);
    return response;
  };
  const userQuestions = async (user) => {
    const response = await axios.get(`${API}/${user}/solved`);
    return response;
  };

  const checkUserExists = (response) => {
    if (response.errors && response.errors.some((error) => error.message.includes('user does not exist')) || response.matchedUser === null) {
      console.log('User does not exist.');
      return false; // User not found
    }
  
    if (response.username) {
      console.log('User found:', response.username);
      return true; // User found
    }
  
    console.log('Unknown response.');
    return false;
  }

  return (
    <APIContext.Provider value={{ findUser, uid, userContests, userCalendar, userQuestions, setUid, checkUserExists}}>
      {children}
    </APIContext.Provider>
  );
}
