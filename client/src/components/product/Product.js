import React from 'react';
import './ProductStyle.css';
import { API_UPLOADS } from '../../constants/constance';
import { Link } from 'react-router-dom';

const Product = ({ id, title, category, price, imageName }) => {
    price = price ? price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : '';
    return (
        <div>
            <Link to={`/product/${id}`} className="flex flex-col items-center">
                <div className="rounded-lg overflow-hidden hover:opacity-90 h-[300px]">
                    <img
                        className="object-cover h-full"
                        src={`${API_UPLOADS}/${imageName}`}
                        alt={title}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = `${API_UPLOADS}/default-image-for-error.jpg`;
                        }}
                    />
                </div>
                <h2 className="mt-3 text-gray-400">{category}</h2>
                <h3 className={`w-full truncate text-center`} title={title}>
                    {title}
                </h3>
                <p className="text-sm font-semibold">{price}</p>
            </Link>
        </div>
    );
};

export default Product;
