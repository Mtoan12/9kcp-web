import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
function getItem(label, key, children, type) {
    return {
        key,
        children,
        label,
        type,
    };
}

const toLink = (href, title) => {
    return <Link to={href}>{title}</Link>;
};

const items = [
    getItem('Sản phẩm', 'products', [
        getItem(toLink('/admin/products', 'Tất cả sản phẩm'), '/admin/products'),
        getItem(toLink('/admin/keycaps', 'Keycap'), '/admin/keycaps'),
        getItem(toLink('/admin/keyboards', 'Keyboard'), '/admin/keyboards'),
        getItem(toLink('/admin/kits', 'Kit'), '/admin/kits'),
    ]),
    getItem(toLink('/admin/orders', 'Đơn hàng'), '/admin/orders'),
];
const AdminMenu = () => {
    const onClick = (e) => {
        console.log('click ', e);
    };
    const { pathname } = useLocation();
    return (
        <Menu
            onClick={onClick}
            style={{
                width: 256,
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['product']}
            selectedKeys={pathname}
            mode="inline"
            items={items}
        />
    );
};
export default AdminMenu;
