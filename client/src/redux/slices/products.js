import productApi from 'api/productApi';
import { parsePathnameToCategory } from 'constants/constance';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (pathname, thunkAPI) => {
        let rs;
        try {
            if (pathname) {
                const category = parsePathnameToCategory[pathname];
                rs = await productApi.getProductsByCategory(category);
            } else {
                rs = await productApi.getAllProducts();
            }

            return rs;
        } catch (error) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error.response.data);
            } else {
                console.error(error);
            }
        }
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
        builder.addCase(fetchProducts.pending, (state) => {
            state.error = '';
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.products;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;

            state.error = action.payload.message || 'Lỗi không xác định';
        });
    },
});

const { reducer: productsReducer } = productsSlice;

export default productsReducer;
