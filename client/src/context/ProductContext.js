import { createContext } from 'react';

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
    const contextData = { test: 'ok' };
    return <ProductContext.Provider value={contextData}>{children}</ProductContext.Provider>;
};

export default ProductContextProvider;
