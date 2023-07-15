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
import HomeProducts from './../components/HomeProducts';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity, fetchProduct } from 'redux/slices/productDetail';
import { fetchProducts } from 'redux/slices/productsSuggestion';
import ProductDetailInfo from 'components/ProductDetailInfo';

const ProductDetailPage = () => {
    const { id } = useParams();

    const { addToCart, loadCart } = useContext(CartContext);
    const navigate = useNavigate();

    const isLoading = useSelector((state) => state.productDetail.isLoading);
    const error = useSelector((state) => state.productDetail.error);
    const product = useSelector((state) => state.productDetail.product);
    const quantity = useSelector((state) => state.productDetail.quantity);
    const dispatch = useDispatch();

    const keyboardsSuggesstion = useSelector((state) => state.productsSuggestion.keyboards);
    const keycapsSuggesstion = useSelector((state) => state.productsSuggestion.keycaps);
    const kitsSuggesstion = useSelector((state) => state.productsSuggestion.kits);

    useEffect(() => {
        dispatch(fetchProduct(id));
        if (product) {
            document.title = product.title;
            dispatch(fetchProducts());
        }
    }, [id]);

    useEffect(() => loadCart(), []);

    const suggestProducts = {
        'BÀN PHÍM CƠ': keyboardsSuggesstion,
        KEYCAP: keycapsSuggesstion,
        KIT: kitsSuggesstion,
    };

    const link = {
        'BÀN PHÍM CƠ': '/keyboard',
        KEYCAP: '/keycap',
        KIT: '/kit',
    };

    const handleChangeQuantity = (value) => {
        dispatch(changeQuantity(value));
    };

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
                                category,
                                price,
                                review,
                                imageName = `${item._id}.webp`,
                                inStock,
                                description = 'Chưa có mô tả',
                            } = item;
                            return (
                                <div key={_id}>
                                    <div className="flex flex-col lg:flex-row lg:justify-center gap-10">
                                        <div className="w-full lg:w-1/2 max-w-[750px]">
                                            <img
                                                src={`${API_UPLOADS}/${imageName}`}
                                                className="w-full h-full object-cover"
                                                alt={title}
                                            />
                                        </div>
                                        <ProductDetailInfo
                                            product={product}
                                            quantity={quantity}
                                            handleChangeQuantity={handleChangeQuantity}
                                            handleAddToCartClick={addToCart}
                                        />
                                    </div>
                                    <div className="my-10">
                                        <Description description={description} />
                                    </div>
                                    {product && (
                                        <HomeProducts
                                            header={'Sản phẩm liên quan'}
                                            link={link[product.category]}
                                            products={suggestProducts[product.category]}
                                        />
                                    )}
                                </div>
                            );
                        })}
                </>
            )}
        </div>
    );
};

export default ProductDetailPage;
