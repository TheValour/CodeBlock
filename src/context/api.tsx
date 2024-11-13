import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import axios, { AxiosResponse } from 'axios';

// API base URL
const API = 'https://alfa-leetcode-api.onrender.com';

// Define the type for the context value
type APIContextType = {
  findUser: (user: string) => Promise<AxiosResponse<any>>;
  userContests: (user: string) => Promise<AxiosResponse<any>>;
  userCalendar: (user: string | undefined, year : string) => Promise<AxiosResponse<any>>;
  userQuestions: (user: string | undefined) => Promise<AxiosResponse<any>>;
  checkUserExists: (response : any) => boolean;
  uid: string | null;
  setUid: Dispatch<SetStateAction<string | null>>
};

const defaultValue: APIContextType = {
  findUser: async () => { throw new Error('Not define'); },
  userContests: async () => { throw new Error('Not define'); },
  userCalendar: async () => { throw new Error('Not define'); },
  userQuestions: async () => { throw new Error('Not define'); },
  checkUserExists: () => { throw new Error('Not define'); },
  uid : '',
  setUid: ()=>{}
};


// Provide default value or initial state for the context
export const APIContext = createContext<APIContextType>(defaultValue);

type APIContextProviderProps = {
  children: ReactNode;
};

export function APIContextProvider({ children }: APIContextProviderProps) {
  const [uid, setUid] = useState<string | null>("hello");

  const findUser = async (user: string): Promise<AxiosResponse<any>> => {
    const response = await axios.get(`${API}/${user}`); 
    return response;
  };
  const userContests = async (user: string): Promise<AxiosResponse<any>> => {
    const response = await axios.get(`${API}/${user}/contest`);
    return response;
  };
  const userCalendar = async (user: string | undefined, year : string): Promise<AxiosResponse<any>> => {
    const response = await axios.get(`${API}/userProfileCalendar?username=${user}&year=${year}`);
    return response;
  };
  const userQuestions = async (user: string | undefined): Promise<AxiosResponse<any>> => {
    const response = await axios.get(`${API}/${user}/solved`);
    return response;
  };

  const checkUserExists = (response : any) => {
    if (response.errors && response.errors.some((error : any) => error.message.includes('user does not exist')) || response.matchedUser === null) {
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
