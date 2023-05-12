import { useEffect, useReducer } from 'react';
import { API_URL, LOAD_FAILURE, LOAD_SUCCESSFUL } from '../constants/constance';
import reducer from '../reducers/productReducer';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Product from '../components/product/Product';
const ProductPage = () => {
    const { pathname } = useLocation();

    const [productState, dispatch] = useReducer(reducer, {
        isLoading: true,
        error: '',
        products: null,
    });

    const { isLoading, error, products } = productState;
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/product${pathname}`);
                if (response.data.success) {
                    dispatch({
                        type: LOAD_SUCCESSFUL,
                        payload: response.data.keycaps,
                    });
                }
            } catch (error) {
                if (error.response.data) {
                    dispatch({
                        type: LOAD_FAILURE,
                        payload: error.response.data.message,
                    });
                }
                dispatch({
                    type: LOAD_FAILURE,
                    payload: 'Lỗi không xác định',
                });
            }
        };

        fetchProduct();
    }, [pathname]);
    return (
        <div className="px-2 mt-5">
            <div className="container mx-auto grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
                {isLoading ? (
                    <h2 className="mx-auto mt-5">Loading...</h2>
                ) : error.length > 0 ? (
                    <h2 className="mx-auto mt-5">{error}</h2>
                ) : (
                    products &&
                    products.map((product) => {
                        if (!product.imageName) {
                            product = {
                                ...product,
                                imageName: `${product._id}.webp`,
                            };
                        }
                        return (
                            <Product
                                key={product._id}
                                id={product._id}
                                title={product.title}
                                price={product.price}
                                category={product.category}
                                imageName={product.imageName}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};
export default ProductPage;
