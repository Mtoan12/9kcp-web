import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const { API_URL } = require('constants/constance');

export const fetchProduct = createAsyncThunk('productDetail/fetchProduct', async (id, thunkAPI) => {
    try {
        const res = await axios.get(`${API_URL}/product/detail/${id}`);
        return res.data;
    } catch (error) {
        return error.response.data;
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
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.product = action.payload.product;
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.error = action.payload || 'Lỗi không xác định';
        });
    },
});

const { reducer: productDetailReducer, actions } = productDetailSlice;
export const { changeQuantity } = actions;
export default productDetailReducer;
