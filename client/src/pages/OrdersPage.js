import { Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrders, loadUserOrdersTable } from 'redux/slices/order';
import UserMenu from './../components/UserMenu';
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
        title: 'Địa chỉ giao hàng',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },
];
const OrdersPage = () => {
    const user = useSelector((state) => state.auth.user);
    const orders = useSelector((state) => state.order.orders);
    const tableData = useSelector((state) => state.order.tableData);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Đơn hàng của bạn';
    }, []);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadUserOrdersTable());
    }, [dispatch, orders]);

    const navigate = useNavigate();

    return (
        <>
            {user && (
                <div className="flex flex-col justify-center gap-5">
                    <UserMenu />
                    <span className="uppercase">Đơn hàng của bạn</span>
                    <Table columns={columns} dataSource={tableData} scroll={{ x: 'max-content' }} />
                </div>
            )}
        </>
    );
};
export default OrdersPage;
