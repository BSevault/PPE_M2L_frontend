import { Navigate } from "react-router-dom";

const Logout = () => {
    
    return (  
        <div className="logout">
            <Navigate to="/login" />
        </div>
    );
}
 
export default Logout;