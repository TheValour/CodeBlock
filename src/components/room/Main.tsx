import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { collection, getDocs } from "firebase/firestore"; 
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
                if (user?.uid) {
                    const docRef = collection(db, "users", user.uid, "profiles");
                    const docSnap = await getDocs(docRef); // Fetch the document snapshot

                    if (docSnap.size > 0) {
                        docSnap.forEach(async (doc) => {
                            const docData = doc.data();
                            setCurrUser(docData as User);
                        });
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
    }, [user]); // Add user to the dependency array

    return (
        <div className="bg-gray-300 h-screen border-blue-500">
           { currUser ? <RoomUser currUser={currUser}/> : <AddProfile/> }
        </div>
    );
}