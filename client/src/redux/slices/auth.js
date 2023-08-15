import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import authApi from 'api/authApi';

export const loadUser = createAsyncThunk('auth/loadUser', async (_ = null, thunkAPI) => {
    try {
        const response = await authApi.loadUser();
        if (response.success) {
            return response;
        }
    } catch (error) {
        if (error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue(error.message);
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
        logOut: (state) => {
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
