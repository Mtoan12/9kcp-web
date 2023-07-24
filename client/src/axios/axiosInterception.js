import axios from 'axios';
import refreshToken from 'utils/refreshToken';

axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        if (error.response && error.response.status === 401) {
            try {
                await refreshToken();
            } catch (error) {}
        }
        return Promise.reject(error);
    }
);
