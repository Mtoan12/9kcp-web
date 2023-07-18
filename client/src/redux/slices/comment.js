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
    reducers: {
        addNewComment: (state, action) => {
            const newComment = [...state.comments, action.payload];
            state.comments = newComment;
        },
        editComment: (state, action) => {
            const findIndex = state.comments.findIndex(
                (comment) => comment._id === action.payload._id
            );
            const newComment = [...state.comments];
            newComment.splice(findIndex, 1, action.payload);
            state.comments = newComment;
        },
        deleteComment: (state, action) => {
            const findIndex = state.comments.findIndex(
                (comment) => comment._id === action.payload._id
            );
            const newComment = [...state.comments];
            newComment.splice(findIndex, 1);
            state.comments = newComment;
        },
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

const { reducer: commentsReducer, actions } = commentsSlice;
export const { addNewComment, editComment, deleteComment } = actions;
export default commentsReducer;
