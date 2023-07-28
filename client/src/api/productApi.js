import queryString from 'query-string';
import axios from './axiosConfig';

class ProductApi {
    getAllProducts = async () => {
        try {
            const rs = await axios.get(`/product`);

            return rs.data;
        } catch (error) {
            throw error;
        }
    };
    getProductsByCategory = async (category) => {
        try {
            const query = queryString.stringify({ category });
            const rs = await axios.get(`/product/filter?${query}`);

            return rs.data;
        } catch (error) {
            throw error;
        }
    };
    getProductById = async (productId) => {
        try {
            const rs = await axios.get(`/product/detail/${productId}`);

            return rs.data;
        } catch (error) {
            throw error;
        }
    };
    searchProduct = async (searchText) => {
        try {
            const query = queryString.stringify({ query: searchText });
            const rs = await axios.get(`/product/search?${query}`);

            return rs.data;
        } catch (error) {
            throw error;
        }
    };
}

const productApi = new ProductApi();
export default productApi;
