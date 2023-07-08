import { useEffect, useReducer } from 'react';
import { API_URL, LOAD_FAILURE, LOAD_SUCCESSFUL } from '../constants/constance';
import reducer from '../reducers/productReducer';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Product from '../components/product/Product';
import Loading from '../components/Loading';
import Error from '../components/Error';
import keyboardBanner from '../img/keyboard-banner.webp';
import kitBanner from '../img/kit-banner.webp';
import keycapBanner from '../img/keycap-banner.png';

const ProductsPage = () => {
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
                        payload: response.data.products,
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

    const bannerSrc = {
        '/keyboard': 'Bộ sưu tập Bàn phím cơ',
        '/kit': 'Bộ sưu tập Kit',
        '/keycap': 'Bộ sưu tập Keycap',
        '/products': 'Tất cả sản phẩm',
    };

    useEffect(() => {
        document.title = bannerSrc[pathname];
    }, [pathname]);

    return (
        <div className="px-2 mt-5">
            <h1 className="uppercase flex justify-center font-semibold text-3xl my-10">
                {bannerSrc[pathname]}
            </h1>
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
                            const {
                                _id,
                                title,
                                price,
                                category,
                                imageName = `${product._id}.webp`,
                            } = product;
                            return (
                                <Product
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    price={price}
                                    category={category}
                                    imageName={imageName}
                                />
                            );
                        })}
                </div>
            )}
        </div>
    );
};
export default ProductsPage;
