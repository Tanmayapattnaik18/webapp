import React, { Children, createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ Children }) => {
    const [ authState, setAuthState] = useState({
        isAuthenticated:false,
        token:null,
        email:null,
    });

    const login = (token, email) => {
       setAuthState ({
        isAuthenticated:true,
        token,
        email,
       }

       );
    };

    const logout = () => {
        setAuthState ({
            isAuthenticated:false,
            token:null,
            email:null,
        });
    };
        return (
            <AuthContext.Provider value={{ authState, login, logout}}>
                {Children}
            </AuthContext.Provider>
        );
    
};