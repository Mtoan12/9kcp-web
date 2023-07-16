import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from 'constants/constance';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (productId, thunkAPI) => {
        const res = await axios.get(`${API_URL}/comment/${productId}`);
        return res.data;
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        isLoading: false,
        error: '',
        comments: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.error = '';
            state.isLoading = true;
        });
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.comments = action.payload.comments;
        });
        builder.addCase(fetchComments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        });
    },
});

const { reducer: commentsReducer } = commentsSlice;
export default commentsReducer;
