import { Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../constants/constance';
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
    useEffect(() => {
        const fetchOrders = async () => {
            const rs = await axios.get(`${API_URL}/order`);
            console.log(rs);
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
                    date: createAt,
                    quantity,
                    status,
                };
            });

            setOrders(newOrders);
        };

        fetchOrders();
    }, []);
    return (
        <div className="flex justify-center">
            <Table columns={columns} dataSource={orders} />
        </div>
    );
};
export default OrdersPage;
