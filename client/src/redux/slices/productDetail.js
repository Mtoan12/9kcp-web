import productApi from 'api/productApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchProduct = createAsyncThunk('productDetail/fetchProduct', async (id, thunkAPI) => {
    try {
        const res = await productApi.getProductById(id);

        return res;
    } catch (error) {
        if (error.response) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            console.error(error);
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
            state.product = action.payload.product;
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.error = action.payload.message || 'Lỗi không xác đinh';
        });
    },
});

const { reducer: productDetailReducer, actions } = productDetailSlice;
export const { changeQuantity } = actions;
export default productDetailReducer;
