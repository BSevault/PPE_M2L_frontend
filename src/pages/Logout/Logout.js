import { Navigate } from "react-router-dom";

// juste une redirection vers le home aprèss le logOut
const Logout = () => {
    
    return (  
        <div className="logout">
            <Navigate to="/login" />
        </div>
    );
}
 
export default Logout;