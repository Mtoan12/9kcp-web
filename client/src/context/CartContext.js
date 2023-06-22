import { createContext, useEffect, useReducer, useState } from 'react';
import { API_URL, LOCAL_STORAGE_CART } from '../constants/constance';
import { message } from 'antd';
import axios from 'axios';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [productsCartQuantity, setProductsCartQuantity] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const findItemIndexById = (id) => {
        return cartItems ? cartItems.findIndex((cartItem) => cartItem.item._id === id) : -1;
    };

    const writeToLocalStorage = (cart) => {
        if (cartItems) {
            localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(cart));
        }
    };
    const loadCart = () => {
        const cartInStorage = localStorage.getItem(LOCAL_STORAGE_CART);
        setCartItems(cartInStorage ? JSON.parse(cartInStorage) : []);
        setProductsCartQuantity(cartInStorage ? JSON.parse(cartInStorage).length : 0);
    };

    const addToCart = (item, quantity) => {
        quantity = Number(quantity);
        const findIndex = findItemIndexById(item._id);
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

    const calTotalAmount = () => {
        const total = cartItems
            ? cartItems.reduce((amount, cart) => {
                  return amount + cart.item.price * cart.quantity;
              }, 0)
            : 0;

        setTotalAmount(total);
    };

    const deleteProductFromCart = (id) => {
        const newCartItems = [...cartItems];
        const findIndex = findItemIndexById(id);
        newCartItems.splice(findIndex, 1);

        setCartItems(newCartItems);
        writeToLocalStorage(newCartItems);
        loadCart();
    };

    const changeProductQuantity = (id, newQuantity) => {
        const findIndex = findItemIndexById(id);
        const modifyItem = { item: cartItems[findIndex].item, quantity: newQuantity };

        const newCartItems = [...cartItems];
        newCartItems.splice(findIndex, 1, modifyItem);
        // console.log({ findIndex, modifyItem, newCartItems });
        setCartItems(newCartItems);
        writeToLocalStorage(newCartItems);
        loadCart();
    };

    const removeAllCart = () => {
        localStorage.setItem('cart', '[]');
        loadCart();
        setCartItems([]);
    };

    const paymentHandle = async () => {
        try {
            for (const cart of cartItems) {
                const { item, quantity } = cart;
                const rs = await axios.post(`${API_URL}/order`, {
                    productId: item._id,
                    quantity,
                });
            }
            message.success('Thanh toán thành công');
            removeAllCart();
        } catch (error) {
            message.error('Thanh toán thất bại');
            console.log(error);
        }
    };
    const data = {
        addToCart,
        cartItems,
        loadCart,
        productsCartQuantity,
        totalAmount,
        calTotalAmount,
        deleteProductFromCart,
        changeProductQuantity,
        paymentHandle,
    };
    return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
