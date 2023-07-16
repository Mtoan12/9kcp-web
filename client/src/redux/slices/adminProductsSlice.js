import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from 'constants/constance';

export const fetchAdminProducts = createAsyncThunk(
    'adminProducts/fetchAdminProducts',
    async (filter = '', thunkAPI) => {
        try {
            const res = await axios.post(`${API_URL}/product/filter`, {
                filter,
            });

            return res.data;
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
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
            console.log(index);
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
            state.isLoading = true;
            if (action.payload.success) {
                state.products = action.payload.products;
            } else {
                state.error = action.payload.message;
            }
        });
        builder.addCase(fetchAdminProducts.rejected, (state, action) => {
            state.isLoading = true;
            state.error = 'Lỗi không xác định';
        });
    },
});

const { reducer: adminProductsReducer, actions } = adminProductsSlice;
export const { removeProduct, addProduct, updateProduct } = actions;
export default adminProductsReducer;
