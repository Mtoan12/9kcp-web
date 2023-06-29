import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../constants/constance';
import { message } from 'antd';
import AdminProductTable from '../components/AdminProductTable';

const AdminProductPage = () => {
    const [products, setProducts] = useState([]);
    const { pathname } = useLocation();
    const apiPath = pathname === '/admin/products' ? '/' : pathname.slice(6, -1);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const rs = await axios.get(`${API_URL + '/product' + apiPath}`);
                if (rs.data.success) {
                    setProducts([...rs.data.products]);
                }
            } catch (error) {
                message.error('Lỗi không xác định');
            }
        };

        fetchApi();
    }, [apiPath]);

    return (
        <div>
            <AdminProductTable products={products} setProducts={setProducts} />
        </div>
    );
};
export default AdminProductPage;
