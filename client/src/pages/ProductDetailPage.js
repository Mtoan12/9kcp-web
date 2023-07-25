import { message } from 'antd';
import axios from 'axios';
import Comments from 'components/Comments';
import ProductDetailInfo from 'components/ProductDetailInfo';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addNewComment, fetchComments } from 'redux/slices/comment';
import { changeQuantity, fetchProduct } from 'redux/slices/productDetail';
import { fetchProducts } from 'redux/slices/productsSuggestion';
import Description from '../components/Description';
import Error from '../components/Error';
import { CartContext } from '../context/CartContext';
import HomeProducts from './../components/HomeProducts';
import Loading from './../components/Loading';
import { API_UPLOADS, API_URL } from './../constants/constance';

const ProductDetailPage = () => {
    const { id } = useParams();

    const { addToCart, loadCart } = useContext(CartContext);
    const navigate = useNavigate();

    const isLoading = useSelector((state) => state.productDetail.isLoading);
    const error = useSelector((state) => state.productDetail.error);
    const product = useSelector((state) => state.productDetail.product);
    const quantity = useSelector((state) => state.productDetail.quantity);

    const keyboardsSuggesstion = useSelector((state) => state.productsSuggestion.keyboards);
    const keycapsSuggesstion = useSelector((state) => state.productsSuggestion.keycaps);
    const kitsSuggesstion = useSelector((state) => state.productsSuggestion.kits);

    const isCommentsLoading = useSelector((state) => state.comments.isLoading);
    const commentsError = useSelector((state) => state.comments.error);
    const comments = useSelector((state) => state.comments.comments);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product) {
            document.title = product.title;
            dispatch(fetchProducts());
        }
    }, [dispatch, product]);

    useEffect(() => {
        dispatch(fetchComments(id));
    }, [id, dispatch]);

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

    const addComment = async (comment) => {
        try {
            const res = await axios.post(`${API_URL}/comment/${product._id}`, {
                content: comment,
            });

            if (res.data.success) {
                dispatch(addNewComment(comment));
                navigate(0);
                message.success('Cảm ơn đánh giá của bạn');
            }
        } catch (error) {
            if (error.response.data) {
                message.error(error.response.data.message);
            } else {
                message.error('Lỗi không sác định');
            }
        }
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
                                    <div>
                                        <Comments
                                            product={product}
                                            isLoading={isCommentsLoading}
                                            error={commentsError}
                                            comments={comments}
                                            addNewCommentClick={addComment}
                                        />
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
