import axios from 'axios';
import { API_URL } from './../../constants/constance';
import randomSuggestProducts from 'utils/randomSuggestProducts';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchProducts = createAsyncThunk('productsSuggestion/fetchProducts', async () => {
    const res = await axios(`${API_URL}/product`);

    return res.data;
});

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
