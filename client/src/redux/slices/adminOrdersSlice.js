import { createSlice } from '@reduxjs/toolkit';
const adminOrdersSlice = createSlice({
    name: 'adminOrders',
    initialState: {
        isLoading: false,
        error: '',
        orders: [],
    },
});
