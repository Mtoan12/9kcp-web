import axios from 'axios';
import { useEffect, useState } from 'react';
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

    const { pathname } = useLocation();
    const products = useSelector((state) => state.adminProducts.products);
    const dispatch = useDispatch();
    const apiPath = pathname === '/admin/products' ? '/' : pathname.slice(6, -1);

    useEffect(() => {
        dispatch(fetchAdminProducts(filter));
    }, [dispatch, filter]);

    useEffect(() => {
        const filtersObj = {
            '/keyboard': 'BÀN PHÍM CƠ',
            '/kit': 'KIT',
            '/keycap': 'KEYCAP',
        };
        dispatch(fetchAdminProducts({ filter: filtersObj[pathname] }));
    }, [dispatch, apiPath, pathname]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
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
