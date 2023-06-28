import { createContext, useReducer, useState } from 'react';
import axios from 'axios';
import { API_URL, LOCAL_STORAGE_ACCESS_TOKEN_NAME, SET_AUTH } from '../constants/constance';
import { authReducer } from '../reducers/authReducer';
import { setAuth } from '../utils/setAuth';
import { message } from 'antd';
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        isAuthLoading: true,
        isAuthenticated: false,
        user: null,
    });
    const [token, setToken] = useState('');
    const loadUser = async () => {
        if (token) {
            setAuth(token);
        }
        try {
            const response = await axios.get(`${API_URL}/auth`);
            if (response.data.success) {
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthLoading: false,
                        isAuthenticated: true,
                        user: response.data.user,
                    },
                });
            } else {
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthLoading: false,
                        isAuthenticated: false,
                        user: null,
                    },
                });

                localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME);
                setAuth(null);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const loginHandler = async (user) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, user);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME, response.data.accessToken);

                setToken(response.data.accessToken);
                return response.data;
            }
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            } else {
                return {
                    success: false,
                    message: error.message,
                };
            }
        }
    };

    const registerHandler = async (user) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, user);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME, response.data.accessToken);

                setToken(response.data.accessToken);

                return response.data;
            }
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            } else {
                return {
                    success: false,
                    message: error.message,
                };
            }
        }
    };

    const logOutHandler = () => {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME);
        setAuth(null);
        dispatch({
            type: SET_AUTH,
            payload: {
                isAuthLoading: false,
                isAuthenticated: false,
                user: null,
            },
        });
        message.success('Đã đăng xuất tài khoản');
    };
    const authContextData = {
        loginHandler,
        logOutHandler,
        loadUser,
        authState,
        registerHandler,
        user: authState.user,
        token,
        setToken,
    };
    return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
