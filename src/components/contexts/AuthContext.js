import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState('');

    const navigate = useNavigate();

    // used to get adress submited in adressBar, later used in checkLoginStatus
    const currentAdress = useLocation();

    useEffect(() => console.log('user is changed'), [user]);

    const logout = async () => {
        try {
            await axios.get('http://localhost:3001/users/logout', { withCredentials: true });
            setUser()
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    }

    const checkLoginStatus = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3001/users/login`,
                { withCredentials: true });
            setUser(data.success.logged_user);
            navigate(currentAdress.pathname);
        } catch (error) {
            navigate('/');
        }
    }

    useEffect(() => {
        checkLoginStatus();
    }, [])


    const value = {
        user,
        setUser,
        logout
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
 
export default AuthContextProvider;