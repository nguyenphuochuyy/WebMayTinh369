import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
    const {user} = useContext(AuthContext)
    console.log("user private route", user)
    if(localStorage.getItem("access_token") && localStorage.getItem("role")){
        return(
            <>
            {props.children}
            </>
        ) ;
    } else{
        return <Navigate to={"/login"} replace />;
    }
}

export default PrivateRoute;