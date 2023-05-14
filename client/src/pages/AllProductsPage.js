import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { API_URL, LOAD_FAILURE, LOAD_SUCCESSFUL } from '../constants/constance';
import reducer from '../reducers/productReducer';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Product from '../components/product/Product';

const AllProductsPage = () => {
    const [productsState, dispatch] = useReducer(reducer, {
        isLoading: true,
        error: '',
        products: null,
    });

    const { isLoading, error, products } = productsState;

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/product`);

                if (response.data.success) {
                    dispatch({ type: LOAD_SUCCESSFUL, payload: response.data.products });
                }
            } catch (error) {
                if (error.response.data) {
                    dispatch({ type: LOAD_FAILURE, payload: error.response.data.message });
                } else {
                    dispatch({ type: LOAD_FAILURE, payload: 'Lỗi không xác định' });
                }
            }
        };

        getProducts();
    }, []);

    return (
        <div className="px-2 mt-5">
            {isLoading ? (
                <div className="flex justify-center mt-5">
                    <Loading />
                </div>
            ) : error.length > 0 ? (
                <h2 className="flex justify-center mt-5">
                    <Error error={error} />
                </h2>
            ) : (
                <div className="container mx-auto grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
                    {products &&
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
                        })}
                </div>
            )}
        </div>
    );
};
export default AllProductsPage;
