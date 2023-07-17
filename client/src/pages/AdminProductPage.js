import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../constants/constance';
import { message } from 'antd';
import AdminProductTable from '../components/AdminProductTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts } from 'redux/slices/adminProductsSlice';

const AdminProductPage = () => {
    useEffect(() => {
        document.title = 'Quản lý sản phẩm';
    }, []);

    const [filter, setFilter] = useState('');
    const [filterTerm, setFilterTerm] = useState('');

    const { pathname } = useLocation();
    const products = useSelector((state) => state.adminProducts.products);
    const dispatch = useDispatch();
    const apiPath = pathname === '/admin/products' ? '/' : pathname.slice(6, -1);

    useEffect(() => {
        dispatch(fetchAdminProducts(filterTerm));
    }, [dispatch, filterTerm]);

    useEffect(() => {
        const filtersObj = {
            '/keyboard': 'BÀN PHÍM CƠ',
            '/kit': 'KIT',
            '/keycap': 'KEYCAP',
        };
        dispatch(fetchAdminProducts(filtersObj[pathname]));
    }, [dispatch, apiPath, pathname]);

    const timeRef = useRef(null);
    const handleFilterChange = (e) => {
        const value = e.target.value;
        if (timeRef.current) {
            clearTimeout(timeRef.current);
        }

        timeRef.current = setTimeout(() => {
            setFilterTerm(value);
        }, 300);
        setFilter(value);
    };
    return (
        <div className="">
            <input
                type="text"
                placeholder="Filter"
                className="my-3"
                value={filter}
                onChange={handleFilterChange}
            />
            <AdminProductTable products={products} />
        </div>
    );
};
export default AdminProductPage;
