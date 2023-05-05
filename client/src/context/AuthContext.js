import { useState, createContext } from 'react';

const authContext = createContext();

const AuthContext = ({ children }) => {
    const providerValue = {
        test: 123456,
    };
    return <authContext.Provider value={providerValue}>{children}</authContext.Provider>;
};
export default AuthContext;
