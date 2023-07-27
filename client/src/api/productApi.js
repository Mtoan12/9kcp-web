import queryString from 'query-string';
import axios from './axiosConfig';

class ProductApi {
    
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
