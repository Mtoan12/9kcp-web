import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/products';
import productsSuggestionReducer from './slices/productsSuggestion';
import productDetailReducer from './slices/productDetail';
import searchReducer from './search';

const rootReducer = {
    products: productsReducer,
    productsSuggestion: productsSuggestionReducer,
    productDetail: productDetailReducer,
    search: searchReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
