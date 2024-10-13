import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Main() {
    const { user } = useContext(AuthContext);

    return (
        <div>
           { user && (user.displayName ? `Hello, ${user.displayName}` : "User not logged in")}
        </div>
    );
}
