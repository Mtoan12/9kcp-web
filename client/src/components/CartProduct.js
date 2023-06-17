import { Link } from 'react-router-dom';
import { API_UPLOADS } from '../constants/constance';
import { formatPrice } from '../utils/formatPrice';
import { InputNumber } from 'antd';

const CartProduct = ({ item: { _id, imgName, title: productName, price }, quantity }) => {
    return (
        <div>
            <div>
                <div>
                    <img src={`${API_UPLOADS}/${imgName || `${_id}.webp`}`} alt={productName} />
                    <h3>{productName}</h3>
                    <button>Xoá</button>
                </div>
                <span>{formatPrice(price)}</span>
                <div>
                    <InputNumber defaultValue={quantity} min={1} />
                </div>
            </div>
        </div>
    );
};
export default CartProduct;
