import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    
    useEffect( () => console.log('user is changed'), [user]);

    const value = {
        user, 
        setUser

    }

return <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>

}

export default AuthContextProvider;

