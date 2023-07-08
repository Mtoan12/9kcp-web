import { Table, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../constants/constance';

const AdminOrderPage = () => {
    useEffect(() => {
        document.title = 'Quản lý đơn hàng';
    }, []);

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const rs = await axios.get(`${API_URL}/order/all`);
                if (rs.data.success) {
                    const newOrders = rs.data.orders
                        .filter((order) => order.productId)
                        .map((order) => {
                            return {
                                // userId: order.userId._id,
                                userName: order.userId.name,
                                // productId: order.productId?._id,
                                productName: order.productId?.title,
                                quantity: order.quantity,
                                time: order.createAt,
                                status: order.status,
                            };
                        });
                    console.log({ newOrders });
                    setOrders([...newOrders]);
                }
            } catch (error) {
                message.error('Lỗi không xác định');
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        setColumns([
            // {
            //     title: 'Mã khách hàng',
            //     dataIndex: 'userId',
            //     key: 'userId',
            // },
            {
                title: 'Họ tên',
                dataIndex: 'userName',
                key: 'userName',
            },
            // {
            //     title: 'Mã sản phẩm',
            //     dataIndex: 'productId',
            //     key: 'productId',
            // },
            {
                title: 'Tên sản phẩm',
                dataIndex: 'productName',
                key: 'productName',
            },
            {
                title: 'Số lượng',
                dataIndex: 'quantity',
                key: 'quantity',
            },
            // {
            //     title: 'Địa chỉ giao hàng',
            //     dataIndex: 'address',
            //     key: 'address',
            // },
            {
                title: 'Thời gian',
                dataIndex: 'time',
                key: 'time',
            },
            {
                title: 'Trạng thái giao hàng',
                dataIndex: 'status',
                key: 'status',
            },
        ]);
        setData(orders);
    }, [orders]);

    console.log({ orders });
    return (
        <div className="flex">
            <Table columns={columns} dataSource={data} />
        </div>
    );
};
export default AdminOrderPage;
