import { Navigate } from "react-router-dom";
import { useAuth } from "../../components/contexts/AuthContext";
import useAxios from "../../hooks/useAxios/useAxios";

// juste une redirection vers le home aprèss le logOut
const Logout = () => {
    const { setUser } = useAuth();
    const {response} = useAxios('get', `http://localhost:3001/users/logout`);

    setUser();

    console.log(response);

    return (  
        <div className="logout">
           
                <Navigate to="/login" />
        
        </div>
    );
}
 
export default Logout;