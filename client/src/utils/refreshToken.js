import axios from 'axios';
import { API_URL } from 'constants/constance';

const refreshToken = async () => {
    try {
        await axios.get(`${API_URL}/auth/refresh-token`);
    } catch (error) {
        throw error;
    }
};

export default refreshToken;
