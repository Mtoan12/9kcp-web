import React from 'react';
import './ProductStyle.css';
import imgSrc from '../../img/vi-du.webp';

// const data = [
//     {
//         name: 'akko acr',
//         price: 1600000,
//     },
//     {
//         name: 'akko acr 2',
//         price: 1900000,
//     },
//     {
//         name: 'akko acr 3',
//         price: 2000000,
//     },
// ];
const Product = () => {
    return (
        <div>
            <div className="product">
                <div className="product-left">
                    <img className="product-img" src={imgSrc} alt="product-img" />
                </div>
                <div className="product-content">
                    <h3 className="product-name">BỘ KEYCAP CMK RESONANCE</h3>
                    <p className="product-price">600.000₫</p>
                    <a href="/" className="buy-btn">
                        Mua ngay
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Product;
