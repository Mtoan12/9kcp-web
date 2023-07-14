import { useNavigate } from 'react-router-dom';
import { API_UPLOADS } from 'constants/constance';
import { formatPrice } from 'utils/formatPrice';
import { InputNumber } from 'antd';

const CartProduct = ({
    item: { _id, imageName, title: productName, price },
    quantity,
    onDeleteBtnClick,
    onQuantityChange,
}) => {
    let navigate = useNavigate();
    const redirectToProductDetail = () => {
        navigate(`/product/${_id}`);
    };
    return (
        <div className="grid grid-cols-12 mb-4">
            <div className="flex flex-col md:flex-row items-center gap-6 col-span-6">
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={`${API_UPLOADS}/${imageName || `${_id}.webp`}`}
                        className="max-h-[200px] max-w-[200px] cursor-pointer hover:opacity-50 hover-effect "
                        alt={productName}
                        onClick={redirectToProductDetail}
                    />
                </div>
                <div>
                    <h3
                        className="cursor-pointer hover:opacity-50 hover-effect"
                        onClick={redirectToProductDetail}
                    >
                        {productName}
                    </h3>
                    <button
                        className="cursor-pointer hover:opacity-50 hover-effect text-red-600 flex items-center"
                        onClick={() => onDeleteBtnClick(_id)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                        Xoá
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center col-span-4">
                <span className="">{formatPrice(price)}</span>
            </div>
            <div className="col-span-2 flex justify-center items-center">
                <InputNumber
                    defaultValue={quantity}
                    min={1}
                    onChange={(value) => onQuantityChange(_id, value)}
                />
            </div>
        </div>
    );
};
export default CartProduct;
