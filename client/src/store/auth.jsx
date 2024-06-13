import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([])
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };



    let isLoggedIn = !!token;

    //tackling the logout
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

    // JWT AUTHENTICATION - to get the currently loggedIN data

    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:7001/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                // console.log("user data", data.userData);
                setUser(data.userData);
                setIsLoading(false);
                
            }else{
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching user data");
        }
    };

    
    useEffect(() => {
    
        userAuthentication();
    }, []);



    return <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken,isLoading }}>
        {children}
    </AuthContext.Provider>
}


export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outhside of the Provider")
    }
    return authContextValue;
}