import axios from 'axios';
import { API_URL } from 'constants/constance';
// import { loadUser } from 'redux/slices/auth';
// import store from 'redux/store';
import refreshToken from 'utils/refreshToken';

const instance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.error(`Request error: ${error}`);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            try {
                const rs = await refreshToken();
                if (rs.success) {
                    // load lại trạng thái user với accessToken mơi
                    // store.dispatch(loadUser());
                }
            } catch (error) {
                console.error(`Response error: ${error}`);
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
