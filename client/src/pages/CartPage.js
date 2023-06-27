import { Link } from 'react-router-dom';
import CartProduct from '../components/CartProduct';
import { CartContext } from '../context/CartContext';
import { useContext, useEffect } from 'react';
import { formatPrice } from '../utils/formatPrice';
import Delivery from './../components/Delivery';

const CartPage = () => {
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
    useEffect(() => {
        loadCart();
    }, []);
    useEffect(() => {
        calTotalAmount();
    }, [cartItems]);
    return (
        <div className="container mx-auto mt-2 px-3">
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

            <Delivery />

            <div className="flex flex-col justify-start items-start mt-5">
                <span>{productsCartQuantity > 0 && `Thành tiền: ${formatPrice(totalAmount)}`}</span>
                {productsCartQuantity > 0 && (
                    <button className="allBtn py-2 px-10 uppercase text-md" onClick={paymentHandle}>
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
