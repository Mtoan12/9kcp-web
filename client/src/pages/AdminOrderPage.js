import { Select, Table, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formatTimeStamp from 'utils/formatTimeStamp';
import { API_URL } from '../constants/constance';

const AdminOrderPage = () => {
    useEffect(() => {
        document.title = 'Quản lý đơn hàng';
    }, []);

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState('');
    const [deleteBtnShow, setDeleteBtnShow] = useState(false);

    const navigate = useNavigate();
    const onStatusChange = (value, order) => {};
    const handleDeleteOrder = async (e, orderId) => {
        try {
            const res = await axios.delete(`${API_URL}/order/${orderId}`);
            if (res.data.success) {
                message.success('Xóa đơn hàng thành công');
                navigate(0);
            }
        } catch (error) {
            console.log(error);
            message.error('Xóa đơn hàng thất bại');
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const rs = await axios.get(`${API_URL}/order/all`);
                if (rs.data.success) {
                    const newOrders = rs.data.orders
                        .filter((order) => order.productId)
                        .map((order) => {
                            setDeleteBtnShow(
                                order.status === 'Đã hoàn thành' || order.status === 'Hủy đơn hàng'
                            );
                            return {
                                // userId: order.userId._id,
                                userName: order.userId.name,
                                // productId: order.productId?._id,
                                productName: order.productId?.title,
                                quantity: order.quantity,
                                address: order.address,
                                time: formatTimeStamp(order.createAt),
                                status: (
                                    <div className="flex items-center">
                                        <Select
                                            showSearch
                                            placeholder="Chọn danh mục"
                                            optionFilterProp="children"
                                            value={order.status}
                                            onChange={async (value) => {
                                                try {
                                                    const rs = await axios.put(`${API_URL}/order`, {
                                                        status: value,
                                                        userId: order.userId._id,
                                                        productId: order.productId._id,
                                                    });

                                                    navigate(0);
                                                } catch (error) {
                                                    message.error('Lỗi không xác định');
                                                }
                                            }}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '')
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }
                                            options={[
                                                {
                                                    value: 'Đang xử lý',
                                                    label: 'Đang xử lý',
                                                },
                                                {
                                                    value: 'Đã xác nhận',
                                                    label: 'Đã xác nhận',
                                                },
                                                {
                                                    value: 'Đang giao hàng',
                                                    label: 'Đang giao hàng',
                                                },
                                                {
                                                    value: 'Đã giao hàng',
                                                    label: 'Đã giao hàng',
                                                },
                                                {
                                                    value: 'Đã hoàn thành',
                                                    label: 'Đã hoàn thành',
                                                },
                                                {
                                                    value: 'Hủy đơn hàng',
                                                    label: 'Hủy dơn hàng',
                                                },
                                            ]}
                                        />
                                    </div>
                                ),
                                action: (
                                    <button
                                        className="px-5 py-2 text-white text-md font-semibold rounded-lg bg-red-500"
                                        onClick={(e) => handleDeleteOrder(e, order._id)}
                                    >
                                        Xóa
                                    </button>
                                ),
                            };
                        });
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
            {
                title: 'Họ tên',
                dataIndex: 'userName',
                key: 'userName',
            },
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
            {
                title: 'Địa chỉ giao hàng',
                dataIndex: 'address',
                key: 'address',
            },
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
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
            },
        ]);
        setData([...orders]);
    }, [orders]);

    return (
        <div className="flex">
            <Table columns={columns} dataSource={data} />
        </div>
    );
};
export default AdminOrderPage;
