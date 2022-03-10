import { createContext } from "react";

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    const value = {
        user,
        setUser
    }

    return <AuthContext.Provider value={value}>
        { children }
    </AuthContext.Provider>
}
 
export default AuthContextProvider;