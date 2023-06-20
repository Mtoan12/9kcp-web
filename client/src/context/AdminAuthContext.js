import { createContext } from 'react';

export const AdminAuthContext = createContext();

const AdminAuthContextProvider = ({ children }) => {
    const data = { test: 'Context ok' };

    return <AdminAuthContext.Provider value={data}>{children}</AdminAuthContext.Provider>;
};

export default AdminAuthContextProvider;
