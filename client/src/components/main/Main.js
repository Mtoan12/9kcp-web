import React, { useEffect, useReducer, useState } from 'react';
import './MainStyles.css';
import axios from 'axios';
import reducer from 'reducers/productReducer';
import { API_URL, LOAD_FAILURE, LOAD_SUCCESSFUL } from 'constants/constance';
import Loading from 'components/Loading';
import Error from 'components/Error';
import HomeProducts from 'components/HomeProducts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from 'redux/slices/productsSuggestion';

const Main = () => {
    const isLoading = useSelector((state) => state.productsSuggestion.isLoading);
    const error = useSelector((state) => state.productsSuggestion.error);
    const products = useSelector((state) => state.productsSuggestion.products);
    const keyboards = useSelector((state) => state.productsSuggestion.keyboards);
    const kits = useSelector((state) => state.productsSuggestion.kits);
    const keycaps = useSelector((state) => state.productsSuggestion.keycaps);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
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
                    <HomeProducts header="Sản phẩm mới" products={products} link="/products" />
                    <HomeProducts
                        header="Bộ sưu tập Bàn phim cơ"
                        products={keyboards}
                        link="/keyboard"
                    />
                    <HomeProducts header="Bộ sưu tập Keycap" products={keycaps} link="/keycap" />
                    <HomeProducts header="Bộ sưu tập Kit" products={kits} link="/kit" />
                </>
            )}
        </div>
    );
};

export default Main;
