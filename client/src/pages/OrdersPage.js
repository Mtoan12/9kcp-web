import { Table } from 'antd';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { API_URL } from '../constants/constance';
import UserMenu from './../components/UserMenu';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const fetchOrders = async () => {
            const rs = await axios.get(`${API_URL}/order`);
            const orders = rs.data.orders;
            const newOrders = orders.map((order) => {
                const {
                    productId: { title, createAt },
                    _id,
                    quantity,
                    status,
                } = order;
                return {
                    id: _id,
                    name: title,
                    date: new Date(createAt).toUTCString(),
                    quantity,
                    status,
                };
            });

            setOrders(newOrders);
        };

        fetchOrders();
    }, []);

    const navigate = useNavigate();
    if (!user) {
        navigate('/login');
    }

    return (
        <div className="flex flex-col justify-center gap-5">
            <UserMenu />
            <span className="uppercase">Đơn hàng của bạn</span>
            <Table columns={columns} dataSource={orders} />
        </div>
    );
};
export default OrdersPage;
