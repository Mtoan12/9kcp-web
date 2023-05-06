import { SET_AUTH } from '../constants/constance';

export const authReducer = (state, action) => {
    const { type, payload } = action;
    const { isAuthLoading, isAuthenticated, user } = payload;

    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                isAuthLoading,
                isAuthenticated,
                user,
            };
        default:
            return state;
    }
};
