import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const UserMenu = () => {
    const { pathname } = useLocation();
    const items = [
        {
            label: <Link to="/user">Thông tin tài khoản</Link>,
            key: '/user',
        },
        {
            label: <Link to="/orders">Đơn hàng của bạn</Link>,
            key: '/orders',
        },
    ];
    return <Menu mode="horizontal" selectedKeys={pathname} items={items} />;
};
export default UserMenu;
