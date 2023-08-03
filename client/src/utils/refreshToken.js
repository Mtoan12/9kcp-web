import axios from 'axios';
import { API_URL } from 'constants/constance';

const refreshToken = async () => {
    try {
        const rs = await axios.get(`${API_URL}/auth/refresh-token`);

        if (rs.data.success) {
            return rs.data;
        }
    } catch (error) {
        throw error;
    }
};

export default refreshToken;
