import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from 'constants/constance';
import formatTimeStamp from 'utils/formatTimeStamp';

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
    try {
        const res = await axios.get(`${API_URL}/order`);
        return res.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        }
    }
});

const ordersSlice = createSlice({
    name: 'order',
    initialState: {
        isLoading: false,
        orders: [],
        tableData: [],
        error: '',
    },
    reducers: {
        loadUserOrdersTable: (state, action) => {
            if (state.orders) {
                const data = state.orders.map((order) => {
                    return {
                        id: order._id,
                        name: order.productId.title,
                        date: formatTimeStamp(order.createAt),
                        quantity: order.quantity,
                        status: order.status,
                        address: order.address,
                    };
                });
                state.tableData = data;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, (state) => {
            state.error = '';
            state.isLoading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.isLoading = true;
            if (action.payload.success) {
                state.orders = action.payload.orders;
            } else {
                state.error = action.payload.message;
            }
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = 'Lỗi không xác định';
        });
    },
});

const { reducer: ordersReducer, actions } = ordersSlice;
export const { loadUserOrdersTable } = actions;
export default ordersReducer;
