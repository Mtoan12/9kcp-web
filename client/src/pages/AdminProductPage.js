import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchAdminProducts } from 'redux/slices/adminProductsSlice';
import AdminProductTable from '../components/AdminProductTable';

const AdminProductPage = () => {
    useEffect(() => {
        document.title = 'Quản lý sản phẩm';
    }, []);

    const [filter, setFilter] = useState({});
    const [searchText, setSearchText] = useState('');

    const { pathname } = useLocation();
    const products = useSelector((state) => state.adminProducts.products);
    const dispatch = useDispatch();
    const apiPath = pathname === '/admin/products' ? '/' : pathname.slice(6, -1);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAdminProducts(filter));
    }, [dispatch, filter]);

    useEffect(() => {
        const filtersObj = {
            '/keyboard': 'BÀN PHÍM CƠ',
            '/kit': 'KIT',
            '/keycap': 'KEYCAP',
        };
        setFilter({
            ...filter,
            category: filtersObj[apiPath],
        });
    }, [dispatch, apiPath]);

    const timeRef = useRef(null);
    const handleFilterChange = (e) => {
        const value = e.target.value;
        if (timeRef.current) {
            clearTimeout(timeRef.current);
        }

        timeRef.current = setTimeout(() => {
            setFilter({ ...filter, searchText: value });
        }, 300);

        setSearchText(value);

        if (apiPath !== '/') {
            setFilter({
                ...filter,
                searchText: value,
            });
            dispatch(fetchAdminProducts(filter));
            navigate('/admin/products');
        }
    };
    return (
        <div className="">
            <input
                type="text"
                placeholder="Filter"
                className="my-3"
                value={searchText}
                onChange={handleFilterChange}
            />
            <AdminProductTable products={products} />
        </div>
    );
};
export default AdminProductPage;
