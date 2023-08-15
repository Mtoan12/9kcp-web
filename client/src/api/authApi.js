import instance from './axiosConfig';

class AuthApi {
    loadUser = async () => {
        try {
            const rs = await instance.get('/auth');

            if (rs.data && rs.data.success) {
                return rs.data;
            }
        } catch (error) {
            throw error;
        }
    };

    register = async ({ name, email, password }) => {
        try {
            const rs = await instance.post('/auth/register', { name, email, password });

            if (rs.data && rs.data.success) {
                return rs.data;
            }
        } catch (error) {
            throw error;
        }
    };

    login = async ({ email, password }) => {
        try {
            const rs = await instance.post('/auth/login', { email, password });

            if (rs.data && rs.data.success) {
                return rs.data;
            }
        } catch (error) {
            throw error;
        }
    };

    logout = async () => {
        try {
            const rs = await instance.get('/auth/logout');
            if (rs.data && rs.data.success) {
                return rs.data;
            }
        } catch (error) {
            throw error;
        }
    };
}

const authApi = new AuthApi();
export default authApi;
