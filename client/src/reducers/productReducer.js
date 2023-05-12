import { LOAD_FAILURE, LOAD_SUCCESSFUL } from '../constants/constance';

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD_SUCCESSFUL:
            return {
                ...state,
                isLoading: false,
                products: payload,
            };
        case LOAD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export default reducer;
