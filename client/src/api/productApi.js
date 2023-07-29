import queryString from 'query-string';
import axios from './axiosConfig';

class ProductApi {
    getAllProducts = async () => {
        try {
            const rs = await axios.get(`/product`);

            if (rs.data.success) {
                return rs.data;
            }
        } catch (error) {
            throw error;
        }
    };

    getProductsByCategory = async (category) => {
        try {
            const query = queryString.stringify({ category });
            const rs = await axios.get(`/product/filter?${query}`);

            if (rs.data.success) {
                return rs.data;
            }
        } catch (error) {
            throw error;
        }
    };

    getProductById = async (productId) => {
        try {
            const rs = await axios.get(`/product/detail/${productId}`);
            if (rs.data.success) {
                return rs.data;
            }
        } catch (error) {
            throw error;
        }
    };

    searchProduct = async (searchText) => {
        try {
            const query = queryString.stringify({ query: searchText });
            const rs = await axios.get(`/product/search?${query}`);

            if (rs.data.success) {
                return rs.data;
            }
        } catch (error) {
            throw error;
        }
    };

    filterProducts = async (filters) => {
        try {
            const query = queryString.stringify(filters);
            const rs = await axios.get(`/product/filter?${query}`);

            if (rs.data.success) {
                return rs.data;
            }
        } catch (error) {
            throw error;
        }
    };

    removeProduct = async (productId) => {
        try {
            const rs = await axios.delete(`/product/detail/${productId}`);

            if (rs.data.success) {
                return rs.data;
            }
        } catch (error) {
            throw error;
        }
    };

    // formData: image, info {title, brand, price, inStock, category, description}
    editProduct = async (productId, formData) => {
        try {
            const rs = await axios.put(`/product/detail/${productId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (rs.data.success) {
                return rs.data;
            }
        } catch (error) {
            throw error;
        }
    };

    addProduct = async (formData) => {
        try {
            const rs = await axios.post(`/product/add-product`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (rs.data.success) {
                return rs.data;
            }
        } catch (error) {
            throw error;
        }
    };
}

const productApi = new ProductApi();
export default productApi;
