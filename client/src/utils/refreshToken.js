import axios from 'axios';
import { API_URL } from 'constants/constance';
import { loadUser } from 'redux/slices/auth';
import store from 'redux/store';

const refreshToken = async () => {
    try {
        const rs = await axios.get(`${API_URL}/auth/refresh-token`);

        if (rs.data.success) {
            
            store.dispatch(loadUser());
        }
    } catch (error) {
        throw error;
    }
};

export default refreshToken;
