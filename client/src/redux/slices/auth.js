import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import { API_URL, LOCAL_STORAGE_ACCESS_TOKEN_NAME } from 'constants/constance';

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
    // const res = await axios.get(`${API_URL}/auth`);
    // console.log({ res });
    // return res.data;
    try {
        const response = await axios.get(`${API_URL}/auth`);
        if (response.data.success) {
            console.log({ res: response.data });

            return response.data;
        }
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return error.message;
        }
    }
});

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, user);
        if (response.data.success) {
            localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME, response.data.accessToken);

            thunkAPI.dispatch(loadUser());
        }
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return error.message;
        }
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: '',
    },
    reducers: {
        logOut: (state, action) => {
            message.success('Đã đăng xuất tài khoản');

            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadUser.pending, (state) => {
            state.error = '';
            state.isLoading = true;
        });
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.success) {
                state.user = action.payload.user;
                state.isAuthenticated = true;
            } else {
                state.error = action.payload.message;
                console.log({ error: action.payload });
            }
        });
        builder.addCase(loadUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;

            state.error = action.payload;
        });
    },
});

const { reducer: authReducer, actions } = authSlice;
export const { logOut } = actions;

export default authReducer;
