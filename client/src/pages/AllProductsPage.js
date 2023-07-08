import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Product from '../components/product/Product';
import { API_URL, LOAD_FAILURE, LOAD_SUCCESSFUL } from '../constants/constance';
import reducer from '../reducers/productReducer';

const AllProductsPage = () => {
    const [searchText, setSearchText] = useState(null);
    const [productsState, dispatch] = useReducer(reducer, {
        isLoading: true,
        error: '',
        products: null,
    });

    const { isLoading, error, products } = productsState;

    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    useEffect(() => {
        document.title = 'Tất cả sản phẩm';
    }, []);

    useEffect(() => {
        const getProducts = async () => {
            try {
                setSearchText(query.get('query'));
                const url = searchText
                    ? `${API_URL}/product/search?query=${searchText}`
                    : `${API_URL}/product/`;
                const response = await axios.get(url);

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
    }, [searchText, products]);

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
                <div>
                    <span className="uppercase flex justify-center font-semibold text-3xl my-10">
                        {searchText
                            ? `Có ${products.length} kết quả tìm kiếm phù hợp`
                            : 'Tất cả sản phẩm'}
                    </span>
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
                </div>
            )}
        </div>
    );
};
export default AllProductsPage;
