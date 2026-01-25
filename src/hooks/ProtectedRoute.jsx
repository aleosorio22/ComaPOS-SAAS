import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContent";

export const ProtectedRoute = ({children, accesBy}) => {
    const {user} = UserAuth();
    if(accesBy === "non-authenticated"){
        if(!user){
            return children;
        }
        else{
            return <Navigate to="/" />;
        }

    }else if (accesBy === "authenticated"){
        if(user){
            return children;
        }
    }
    return <Navigate to="/login" />;
    
}