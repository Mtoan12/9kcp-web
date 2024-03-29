import { InputNumber } from 'antd';
import { formatPrice } from 'utils/formatPrice';

const ProductDetailInfo = ({ product, quantity, handleChangeQuantity, handleAddToCartClick }) => {
    const { title, brand, category, price, inStock } = product;
    return (
        <div>
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold">{title}</h2>
                <div>
                    Thương hiệu:
                    <span className="text-orange-600 font-medium"> {brand}</span>
                </div>
                <div>
                    Danh mục:
                    <span className="text-orange-600 font-medium"> {category}</span>
                </div>
                <span className="text-xl"> {formatPrice(price)}</span>
                <div>
                    Tình trạng:
                    <span className="text-orange-600 font-medium">
                        {inStock === 0 ? ' Hết hàng' : ` ${inStock} sản phẩm có sẵn`}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    Số lượng:
                    <InputNumber
                        min={1}
                        defaultValue={1}
                        max={inStock}
                        size="middle"
                        onChange={(value) => handleChangeQuantity(value)}
                    />
                </div>
                <button
                    onClick={(e) => handleAddToCartClick(product, quantity)}
                    className={inStock ? 'allBtn px-3 py-2' : 'allBtn px-3 py-2 disable'}
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
    );
};
export default ProductDetailInfo;
