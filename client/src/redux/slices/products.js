import axios from 'axios';
import { API_URL } from 'constants/constance';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchProduct = createAsyncThunk(
    'products/fetchProducts',
    async (pathname = '/', thunkAPI) => {
        const res = await axios.get(`${API_URL}/product${pathname}`);

        return res.data;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        isLoading: false,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.products;
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

const { reducer: productsReducer } = productsSlice;

export default productsReducer;
