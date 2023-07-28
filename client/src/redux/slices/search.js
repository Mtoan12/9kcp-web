import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from 'api/productApi';
export const searchProducts = createAsyncThunk(
    'search/searchProducts',
    async (searchText, thunkAPI) => {
        try {
            const rs = await productApi.searchProduct(searchText);
            console.log({ rs });
            if (rs.success) {
                return rs.products;
            }
        } catch (error) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error.response.data);
            } else {
                console.error(error);
                return thunkAPI.rejectWithValue({ message: 'Lỗi không xác định' });
            }
        }
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
            state.error = '';
            state.isLoading = true;
        });
        builder.addCase(searchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        });
        builder.addCase(searchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        });
    },
});

const { reducer: searchReducer } = searchSlice;
export default searchReducer;
