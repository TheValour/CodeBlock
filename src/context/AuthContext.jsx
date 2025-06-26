import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../components/auth/firebase";

const defaultValue = {
    user: null,
    setUser: () => {},
    signIn: async () => {},
    signOutUser: async () => {} 
};

export const AuthContext = createContext(defaultValue);

export function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const { displayName, email, photoURL, uid } = currentUser;
                setUser({ displayName, email, photoURL, uid });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);
    
    // Sign-out function using Firebase authentication
    const signOutUser = async () =>{
        try{
            await signOut(auth);
            setUser(null);
        }catch (error) {
            throw error;
        }
    }
    // Sign-in function using Firebase authentication
    const signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // console.log("hello", userCredential.user.uid)
            const { displayName, photoURL, email: userEmail, uid } = userCredential.user;
            
            const newUser = {
                displayName: displayName ?? "", 
                photoURL: photoURL ?? "",       
                email: userEmail,
                uid : uid
            };
            setUser(newUser);  
            // Persist user in localStorage
        } catch (error) {
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
