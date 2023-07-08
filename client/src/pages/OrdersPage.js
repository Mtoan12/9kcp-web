import { Table } from 'antd';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { API_URL } from '../constants/constance';
import UserMenu from './../components/UserMenu';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import formatTimeStamp from '../utils/formatTimeStamp';
const columns = [
    {
        title: 'Mã đơn hàng',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Ngày',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },
];
const OrdersPage = () => {
    useEffect(() => {
        document.title = 'Đơn hàng của bạn';
    }, []);

    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const fetchOrders = async () => {
            const rs = await axios.get(`${API_URL}/order`);
            if (rs.data.success) {
                const orders = rs.data.orders;
                const products = rs.data.products;
                if (orders && products) {
                    const newOrders = [];
                    for (let i = 0; i < Math.min(orders.length, products.length); i++) {
                        newOrders.push({
                            name: products[i].title,
                            date: formatTimeStamp(products[i].createAt),
                            id: orders[i]._id,
                            quantity: orders[i].quantity,
                            status: orders[i].status,
                        });
                    }

                    setOrders(newOrders);
                }
            }
        };

        fetchOrders();
    }, []);

    const navigate = useNavigate();
    if (!user) {
        navigate('/login');
    }

    console.log(orders);
    return (
        <div className="flex flex-col justify-center gap-5">
            <UserMenu />
            <span className="uppercase">Đơn hàng của bạn</span>
            <Table columns={columns} dataSource={orders} />
        </div>
    );
};
export default OrdersPage;
