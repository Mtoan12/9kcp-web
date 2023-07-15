import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/products';
import productsSuggestionReducer from './slices/productsSuggestion';
import productDetailReducer from './slices/productDetail';
import searchReducer from './slices/search';
import commentsReducer from './slices/comment';
import authReducer from './slices/auth';

const rootReducer = {
    products: productsReducer,
    productsSuggestion: productsSuggestionReducer,
    productDetail: productDetailReducer,
    search: searchReducer,
    comments: commentsReducer,
    auth: authReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
