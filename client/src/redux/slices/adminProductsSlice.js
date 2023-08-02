import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from 'api/productApi';

export const fetchAdminProducts = createAsyncThunk(
    'adminProducts/fetchAdminProducts',
    async (filter = '', thunkAPI) => {
        try {
            const res = await productApi.filterProducts(filter);

            return res;
        } catch (error) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error.response.data);
            } else {
                console.error(error);
            }
        }
    }
);

const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState: {
        isLoading: false,
        error: '',
        products: [],
    },
    reducers: {
        removeProduct: (state, action) => {
            const index = state.products.findIndex((product) => product._id === action.payload);
            const newProducts = [...state.products];
            newProducts.splice(index, 1);
            state.products = newProducts;
        },
        addProduct: (state, action) => {
            const newProduct = [...state.products, action.payload];
            state.products = newProduct;
        },
        updateProduct: (state, action) => {
            const newProducts = [...state.products];
            const index = newProducts.findIndex((product) => product._id === action.payload._id);
            newProducts.splice(index, 1, action.payload);
            state.products = newProducts;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAdminProducts.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        });
        builder.addCase(fetchAdminProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.products;
        });
        builder.addCase(fetchAdminProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message || 'Lỗi không xác định';
        });
    },
});

const { reducer: adminProductsReducer, actions } = adminProductsSlice;
export const { removeProduct, addProduct, updateProduct } = actions;
export default adminProductsReducer;
