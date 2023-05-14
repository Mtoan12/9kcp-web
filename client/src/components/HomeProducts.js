import Product from './product/Product';

const HomeProducts = ({ header, products }) => {
    if (header !== 'Sản phẩm mới') {
        header = 'Bộ sưu tập ' + header;
    }
    return (
        <div className="mt-20 flex flex-col justify-center">
            <h2 className="uppercase text-center text-lg lg:text-2xl mb-10">{header}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10">
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
            <div className="flex justify-center">
                <button className="allBtn px-4 py-1 uppercase">Xem tất cả {header}</button>
            </div>
        </div>
    );
};
export default HomeProducts;
