import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from 'redux/slices/products';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Product from '../components/product/Product';

const AllProductsPage = () => {
    const isLoading = useSelector((state) => state.products.isLoading);
    const products = useSelector((state) => state.products.products);
    const error = useSelector((state) => state.products.error);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Tất cả sản phẩm';
    }, []);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

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
                <div className="container uppercase">
                    <h1 className="font-semibold text-3xl my-10 flex justify-center items-center">
                        Tất cả sản phẩm
                    </h1>
                    <div className="mx-auto grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
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
