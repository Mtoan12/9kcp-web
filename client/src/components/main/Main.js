import React, { useEffect, useReducer, useState } from 'react';
import './MainStyles.css';
import HomeProducts from './../HomeProducts';
import reducer from '../../reducers/productReducer';
import { API_URL, LOAD_FAILURE, LOAD_SUCCESSFUL } from '../../constants/constance';
import axios from 'axios';
import Loading from '../Loading';
import Error from '../Error';
const Main = () => {
    const [newProducts, setNewProducts] = useState([]);
    const [newKeyboards, setNewKeyboards] = useState([]);
    const [newKits, setNewKits] = useState([]);
    const [newKeycaps, setNewKeycaps] = useState([]);

    const [productsState, dispatch] = useReducer(reducer, {
        isLoading: true,
        error: '',
        products: null,
    });

    const { isLoading, error } = productsState;

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/product`);

                if (response.data.success) {
                    const products = response.data.products;
                    dispatch({ type: LOAD_SUCCESSFUL, payload: products });
                    setNewProducts(products.slice(products.length - 4));
                    const newKeyboards = products.filter(
                        (product) => product.category === 'BÀN PHÍM CƠ'
                    );
                    const newKeycaps = products.filter((product) => product.category === 'KEYCAP');
                    const newKits = products.filter((product) => product.category === 'KIT');
                    setNewKeyboards(newKeyboards.slice(newKeyboards.length - 4));
                    setNewKeycaps(newKeycaps.slice(newKeycaps.length - 4));
                    setNewKits(newKits.slice(newKits.length - 4));
                }
            } catch (error) {
                if (error.response.data) {
                    dispatch({ type: LOAD_FAILURE, payload: error.response.data.message });
                } else {
                    dispatch({ type: LOAD_FAILURE, payload: 'Lỗi không xác định' });
                }
            }
        };

        getProducts();
    }, []);
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
                <>
                    <HomeProducts header="Sản phẩm mới" products={newProducts} link="/products" />
                    <HomeProducts header="Bàn phim cơ" products={newKeyboards} link="/keyboard" />
                    <HomeProducts header="Keycap" products={newKeycaps} link="/keycap" />
                    <HomeProducts header="Kit" products={newKits} link="/kit" />
                </>
            )}
        </div>
    );
};

export default Main;
