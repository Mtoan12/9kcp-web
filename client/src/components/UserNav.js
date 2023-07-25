import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';
export const UserNav = ({ user, isAuthenticated, onClickLogOutHandler }) => {
    const items = [
        {
            key: '1',
            label: (
                <div>
                    {user.isAdmin && (
                        <Link
                            to="/admin/products"
                            className="block w-full uppercase cursor-pointer hover:opacity-50 hover-effect"
                        >
                            Quản lý
                        </Link>
                    )}
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <Link
                    to="/user"
                    className="block w-full uppercase cursor-pointer hover:opacity-50 hover-effect"
                >
                    Thông tin tài khoản
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link
                    to="/orders"
                    className="block w-full uppercase cursor-pointer hover:opacity-50 hover-effect"
                >
                    Đơn hàng của bạn
                </Link>
            ),
        },
        {
            key: '4',
            label: (
                <span
                    onClick={onClickLogOutHandler}
                    className="block w-full uppercase cursor-pointer hover:opacity-50 hover-effect"
                >
                    Đăng xuất
                </span>
            ),
        },
    ];
    return (
        <Dropdown menu={{ items }}>
            <div className="flex items-center gap-1">
                <div className="relative group flex gap-1 items-center cursor-pointer hover:opacity-50 hover-effect">
                    <Link to="/user" className="header-account text-ellipsis">
                        Xin chào {user.name}
                    </Link>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                </div>
            </div>
        </Dropdown>
    );
};
