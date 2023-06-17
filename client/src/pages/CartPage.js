import { Link } from 'react-router-dom';
import CartProduct from '../components/CartProduct';
import { CartContext } from '../context/CartContext';
import { useContext, useEffect } from 'react';

const CartPage = () => {
    const { cartItems, loadCart, productsCartQuantity } = useContext(CartContext);
    useEffect(() => {
        loadCart();
    }, []);
    return (
        <div className="container mx-auto mt-2">
            <h2 className="uppercase text-md">{`Giỏ hàng (${productsCartQuantity} sản phẩm)`}</h2>
            {cartItems &&
                cartItems.map((item) => {
                    console.log(item);
                    return <CartProduct key={item._id} {...item} />;
                })}
            <div>
                <span>Thành tiền {}</span>
                <button className="allBtn py-2 px-10 uppercase text-md">Thanh toán ngay</button>
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
