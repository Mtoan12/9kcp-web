import { useEffect } from 'react';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Họ tên',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
];

const AdminOrderPage = () => {
    useEffect(() => {
        document.title = 'Quản lý đơn hàng';
    }, []);

    return <div>AdminOrderPage</div>;
};
export default AdminOrderPage;
