import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/products';
import productsSuggestionReducer from './slices/productsSuggestion';
import productDetailReducer from './slices/productDetail';

const rootReducer = {
    products: productsReducer,
    productsSuggestion: productsSuggestionReducer,
    productDetail: productDetailReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
