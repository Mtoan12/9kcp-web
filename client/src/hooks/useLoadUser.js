import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LOCAL_STORAGE_ACCESS_TOKEN_NAME } from '../constants/constance';

const useLoadUser = () => {
    const { loadUser, token, setToken } = useContext(AuthContext);

    useEffect(() => {
        try {
            setToken(localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME));
            loadUser();
        } catch (error) {
            console.log(error);
        }
    }, [token]);
};

export default useLoadUser;
