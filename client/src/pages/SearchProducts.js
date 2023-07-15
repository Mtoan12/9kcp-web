import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Product from '../components/product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from 'redux/search';

const SearchProducts = () => {
    const isLoading = useSelector((state) => state.search.isLoading);
    const products = useSelector((state) => state.search.products);
    const error = useSelector((state) => state.search.error);
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    useEffect(() => {
        dispatch(searchProducts(query));
        document.title = 'Kết quả tìm kiếm';
    }, [searchParams]);

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
                        {products
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
export default SearchProducts;
