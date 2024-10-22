import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../auth/firebase";
import RoomUser from "./RoomUser";
import AddProfile from "./AddProfile";

// Define the structure of currUser
interface User {
    name: string;
    ranking: string;
    avatar: string;
    username: string;
}

export default function Main() {
    const { user } = useContext(AuthContext);
    const [currUser, setCurrUser] = useState<User | null>(null);

    useEffect(() => {
        async function getUser() {
            try {
                if (user && user.uid) {
                    const docRef = doc(db, "users", user.uid); // Reference to the document by UID
                    const docSnap = await getDoc(docRef); // Fetch the document snapshot

                    if (docSnap.exists()) {
                        setCurrUser(docSnap.data() as User); // Set user data in state
                        console.log("Document data:", docSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                } else {
                    console.log("User is not defined or missing UID.");
                }
            } catch (e) {
                console.error("Error fetching document: ", e);
            }
        }
        getUser();
    }, []); 

    return (
        <div className="bg-gray-300 h-screen border-blue-500">
           { currUser ? <RoomUser currUser={currUser}/> : <AddProfile/> }
        </div>
    );
}
