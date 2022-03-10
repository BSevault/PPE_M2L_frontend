import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState('');

    useEffect(() => console.log('user is changed'), [user]);

    const value = {
        user,
        setUser
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
 
export default AuthContextProvider;