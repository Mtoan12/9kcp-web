import productApi from 'api/productApi';
import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const { API_URL } = require('constants/constance');

export const fetchProduct = createAsyncThunk('productDetail/fetchProduct', async (id, thunkAPI) => {
    try {
        const res = await productApi.getProductById(id);

        if (res.success) {
            return res;
        }
    } catch (error) {
        if (error.response) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
});

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
        isLoading: false,
        product: null,
        quantity: 1,
        error: '',
    },
    reducers: {
        changeQuantity: (state, action) => {
            state.quantity = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.success) {
                state.product = action.payload.product;
            } else {
                state.error = action.payload.message;
            }
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = 'Lỗi không xác đinh';
        });
    },
});

const { reducer: productDetailReducer, actions } = productDetailSlice;
export const { changeQuantity } = actions;
export default productDetailReducer;
