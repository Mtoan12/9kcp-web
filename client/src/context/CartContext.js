import { createContext, useEffect, useReducer, useState } from 'react';
import { LOCAL_STORAGE_CART } from '../constants/constance';
import { message } from 'antd';

export const CartContext = createContext();

// const reducer = (state, action) => {
//     const { type, payload } = action.type;
//     switch (type) {
//         case value:

//             break;

//         default:
//             break;
//     }
// };
const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [productsCartQuantity, setProductsCartQuantity] = useState(0);
    const writeToLocalStorage = (cart) => {
        if (cartItems) {
            localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(cart));
        }
    };
    const loadCart = () => {
        const cartInStorage = localStorage.getItem(LOCAL_STORAGE_CART);
        setCartItems(cartInStorage && JSON.parse(cartInStorage));
        setProductsCartQuantity(cartInStorage && JSON.parse(cartInStorage).length);
    };

    const addToCart = (item, quantity) => {
        quantity = Number(quantity);
        const findIndex = cartItems.findIndex((cartItem) => cartItem.item._id === item._id);
        let newCartItems;
        if (findIndex >= 0) {
            newCartItems = [...cartItems];
            const oldQuantity = newCartItems[findIndex].quantity;
            newCartItems.splice(findIndex, 1, { item, quantity: oldQuantity + quantity });
        } else {
            newCartItems = [...cartItems, { item, quantity }];
        }
        setCartItems(newCartItems);
        writeToLocalStorage(newCartItems);
        loadCart();
        console.log(newCartItems);
        message.success(`Đã thêm sản phẩm "${item.title}" vào giỏ hàng`);
    };

    const data = { addToCart, cartItems, loadCart, productsCartQuantity };
    return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
