import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../components/auth/firebase";

// Define the User type
type User = {
    displayName: string | null;  
    photoURL: string | null;     
    email: string | null;
};

// Define the context type with the User type
type AUTHContextType = {
    user: User | null;  
    setUser: Dispatch<SetStateAction<User | null>>;  
    signIn: (email: string, password: string) => Promise<void>;
    signOutUser: () => Promise<void>; 
};

const defaultValue: AUTHContextType = {
    user: null,
    setUser: () => {},
    signIn: async () => {},
    signOutUser: async () => {} 
};

type AUTHContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AUTHContextType>(defaultValue);

export function AuthContextProvider({ children }: AUTHContextProviderProps) {

    const [user, setUser] = useState<User | null>(null);

    // Sign-out function using Firebase authentication
    const signOutUser = async () =>{
        try{
            await signOut(auth);
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            localStorage.removeItem("user");
            setUser(null);
        }catch (error) {
            throw error;
        }
    }
    // Sign-in function using Firebase authentication
    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const { displayName, photoURL, email: userEmail } = userCredential.user;
            
            const newUser = {
                displayName: displayName ?? "", 
                photoURL: photoURL ?? "",       
                email: userEmail
            };
            setUser(newUser);  
            // Persist user in localStorage
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("user", JSON.stringify(newUser)); 
        } catch (error: any) {
            console.error("Error during sign-in:", error.code, error.message, error);
            throw error;  // Throw the error if sign-in fails
        }
    };

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedEmail = localStorage.getItem("email");
        const savedPassword = localStorage.getItem("password");

        if (savedUser) {
            setUser(JSON.parse(savedUser));  // Load user from localStorage
        } else if (savedEmail && savedPassword) {
            signIn(savedEmail, savedPassword).catch((error) => {
                console.error("Failed to sign in automatically", error);
                localStorage.removeItem("email");
                localStorage.removeItem("password");
            });
        }
    }, []);  // Run only on initial render

    return (
        <AuthContext.Provider value={{ user, setUser, signIn, signOutUser }}>
            {children}
        </AuthContext.Provider>
    );
}
