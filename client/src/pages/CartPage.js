import { message } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartProduct from '../components/CartProduct';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import Delivery from './../components/Delivery';

const CartPage = () => {
    const [deliveryAddress, setDeliveryAddress] = useState({
        isSubmit: false,
        province: '',
        district: '',
        address: '',
    });
    const {
        cartItems,
        loadCart,
        productsCartQuantity,
        calTotalAmount,
        totalAmount,
        deleteProductFromCart,
        changeProductQuantity,
        paymentHandle,
    } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        loadCart();
    }, []);
    useEffect(() => {
        calTotalAmount();
    }, [cartItems]);
    const navigate = useNavigate();
    const paymentBtnClickHandle = () => {
        if (!user) {
            navigate('/login');
        }
        !deliveryAddress.isSubmit
            ? message.warning('Vui lòng chọn địa chỉ giao hàng')
            : paymentHandle();
    };
    return (
        <div className="container flex flex-col gap-5 mt-2 px-3">
            <h2 className="uppercase">{`Giỏ hàng (${productsCartQuantity || 0} sản phẩm)`}</h2>

            <div className="">
                {cartItems &&
                    cartItems.map((cart) => {
                        return (
                            <CartProduct
                                key={cart.item._id}
                                {...cart}
                                onDeleteBtnClick={deleteProductFromCart}
                                onQuantityChange={changeProductQuantity}
                            />
                        );
                    })}
            </div>

            {productsCartQuantity > 0 && (
                <Delivery
                    deliveryAddress={deliveryAddress}
                    setDeliveryAddress={setDeliveryAddress}
                />
            )}

            <div className="flex flex-col justify-start items-start mt-5">
                <span>{productsCartQuantity > 0 && `Thành tiền: ${formatPrice(totalAmount)}`}</span>
                {productsCartQuantity > 0 && (
                    <button
                        className="allBtn py-2 px-10 uppercase text-md"
                        onClick={paymentBtnClickHandle}
                    >
                        Thanh toán ngay
                    </button>
                )}
                <Link
                    to={'/'}
                    className="uppercase py-2 px-10 text-md bg-white border-2 border-black "
                >
                    Tiếp tục mua hàng
                </Link>
            </div>
        </div>
    );
};
export default CartPage;
