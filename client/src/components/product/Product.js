import React from 'react';
import './ProductStyle.css';
import { Link } from 'react-router-dom';
import { API_UPLOADS } from 'constants/constance';
import { formatPrice } from 'utils/formatPrice';

const Product = ({ id, title, category, price, imageName, imageUrl }) => {
    return (
        <div>
            <Link to={`/product/${id}`} className="flex flex-col items-center">
                <div className="rounded-lg overflow-hidden hover:opacity-90 h-[300px]  hover-effect">
                    <img
                        className="object-cover h-full"
                        src={imageUrl}
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
                <p className="text-sm font-semibold">{formatPrice(price)}</p>
            </Link>
        </div>
    );
};

export default Product;
