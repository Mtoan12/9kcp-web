import React, { useLayoutEffect, useRef, useState } from 'react';
import './ProductStyle.css';
import imgSrc from '../../img/vi-du.webp';
import { API_UPLOADS, API_URL } from '../../constants/constance';
import { Link } from 'react-router-dom';

const Product = ({ id, title, category, price, imageName }) => {
    price = price ? price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : '';
    return (
        <div>
            <Link to={`${API_URL}/product/${id}`} className="flex flex-col items-center">
                <div className="rounded-lg overflow-hidden hover:opacity-90 ">
                    <img className="" src={`${API_UPLOADS}/${imageName}`} alt="" />
                </div>
                <h2 className="mt-3 text-gray-400">{category}</h2>
                <h3 className={`w-full truncate text-center`} title={title}>
                    {title}
                </h3>
                <p className="text-sm">{price}</p>
            </Link>
        </div>
    );
};

export default Product;
