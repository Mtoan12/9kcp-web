import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        isLoading: false,
        address: '',
        error: '',
    },
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload;
        },
    },
});

const { reducer: addressReducer, actions } = addressSlice;
export const { setAddress } = actions;
export default addressReducer;
