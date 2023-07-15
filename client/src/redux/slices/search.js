import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from 'constants/constance';

export const searchProducts = createAsyncThunk(
    'search/searchProducts',
    async (searchText, thunkAPI) => {
        console.log(searchText);
        const res = await axios.get(`${API_URL}/product/search?query=${searchText}`);

        return res.data;
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isLoading: false,
        error: '',
        products: [],
    },
    extraReducers: (builder) => {
        builder.addCase(searchProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(searchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.products;
        });
        builder.addCase(searchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        });
    },
});

const { reducer: searchReducer } = searchSlice;
export default searchReducer;
