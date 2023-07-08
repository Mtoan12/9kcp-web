import { InputNumber } from 'antd';
import axios from 'axios';
import { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Description from '../components/Description';
import Error from '../components/Error';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import Loading from './../components/Loading';
import { API_UPLOADS, API_URL, LOAD_FAILURE, LOAD_SUCCESSFUL } from './../constants/constance';

const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_SUCCESSFUL:
            return {
                ...state,
                isLoading: false,
                product: payload,
            };
        case LOAD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};

const ProductDetailPage = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState('1');
    const [productState, dispatch] = useReducer(reducer, {
        isLoading: true,
        error: '',
        product: null,
    });

    const { isLoading, error, product } = productState;

    const { addToCart, loadCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/product/detail/${id}`);
                if (response.data.success) {
                    document.title = response.data.product.title;   
                    dispatch({
                        type: LOAD_SUCCESSFUL,
                        payload: response.data.product,
                    });
                }
            } catch (error) {
                let errMessage = 'Lỗi không xác định';
                if (error.response.data) {
                    errMessage = error.response.data.message;
                }

                dispatch({
                    type: LOAD_FAILURE,
                    payload: errMessage,
                });
                navigate('/not-found');
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => loadCart(), []);

    // const addToCart = async () => {
    //     const newCart = await axios.post(`${API_URL}/cart`);
    // };
    return (
        <div className="px-2 mt-10">
            {isLoading ? (
                <div className="flex justify-center">
                    <Loading />
                </div>
            ) : error && error.length > 0 ? (
                <div className="flex justify-center">
                    <Error error={error} />
                </div>
            ) : (
                <>
                    {product &&
                        [product].map((item) => {
                            const {
                                _id,
                                title,
                                brand,
                                price,
                                review,
                                imageName = `${item._id}.webp`,
                                inStock,
                            } = item;
                            return (
                                <div key={_id}>
                                    <div className="flex flex-col lg:flex-row gap-10">
                                        <div className="h-[750px]">
                                            <img
                                                src={`${API_UPLOADS}/${imageName}`}
                                                className="w-full h-full object-cover"
                                                alt={title}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-2xl font-semibold">{title}</h2>
                                            <div>
                                                Thương hiệu:{' '}
                                                <span className="text-detail font-medium">
                                                    {' '}
                                                    {brand}
                                                </span>
                                            </div>
                                            <span>{review}</span>
                                            <span>{formatPrice(price)}</span>
                                            <div>
                                                Tình trạng:
                                                <span className="text-detail font-medium">
                                                    {inStock === 0
                                                        ? 'Hết hàng'
                                                        : `${inStock} sản phẩm có sẵn`}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                Số lượng:
                                                <InputNumber
                                                    min={1}
                                                    defaultValue={1}
                                                    max={inStock}
                                                    size="middle"
                                                    onChange={(value) => setQuantity(value)}
                                                />
                                            </div>
                                            <button
                                                onClick={(e) => addToCart(product, quantity)}
                                                className={
                                                    inStock
                                                        ? 'allBtn px-3 py-2'
                                                        : 'allBtn px-3 py-2 disable'
                                                }
                                            >
                                                {inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                                            </button>
                                            <div className="font-thin text-sm flex items-center gap-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                                                    />
                                                </svg>
                                                FREESHIP VỚI ĐƠN HÀNG TỪ 800.000Đ
                                            </div>
                                            <div className="font-thin text-sm flex items-center gap-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                                                    />
                                                </svg>
                                                BẢO HÀNH 1 NĂM DO LỖI NHÀ SẢN XUẤT
                                            </div>
                                            <div className="font-thin text-sm flex items-center gap-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                                    />
                                                </svg>
                                                CAM KẾT 100% CHÍNH HÃNG
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <Description />
                                    </div>
                                </div>
                            );
                        })}
                </>
            )}
        </div>
    );
};

export default ProductDetailPage;
