import productApi from 'api/productApi';
import randomSuggestProducts from 'utils/randomSuggestProducts';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchProducts = createAsyncThunk(
    'productsSuggestion/fetchProducts',
    async (_, thunkAPI) => {
        try {
            const res = await productApi.getAllProducts();

            return res;
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

const productsSuggestionSlice = createSlice({
    name: 'productsSuggestion',
    initialState: {
        isLoading: false,
        products: [],
        keyboards: [],
        kits: [],
        keycaps: [],
        error: '',
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.error = '';
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            const { products, keyboards, keycaps, kits } = randomSuggestProducts(
                action.payload.products
            );
            state.products = products;
            state.keyboards = keyboards;
            state.keycaps = keycaps;
            state.kits = kits;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        });
    },
});

const { reducer: productsSuggestionReducer } = productsSuggestionSlice;

export default productsSuggestionReducer;
