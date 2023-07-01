import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';
export const UserNav = ({ user, onClickLogOutHandler }) => {
    const items = [
        {
            key: '1',
            label: (
                <div>
                    {user.isAdmin && <Link
                        to="/admin/products"
                        className="uppercase cursor-pointer hover:opacity-50 hover-effect"
                    >
                        Quản lý
                    </Link>}
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <Link to="/user" className="uppercase cursor-pointer hover:opacity-50 hover-effect">
                    Thông tin tài khoản
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link
                    to="/orders"
                    className="uppercase cursor-pointer hover:opacity-50 hover-effect"
                >
                    Đơn hàng của bạn
                </Link>
            ),
        },
        {
            key: '4',
            label: (
                <button
                    onClick={() => onClickLogOutHandler()}
                    className="uppercase cursor-pointer hover:opacity-50 hover-effect"
                >
                    Đăng xuất
                </button>
            ),
        },
    ];
    return (
        <Dropdown menu={{ items }}>
            <div className="flex items-center gap-1">
                <div className="relative group">
                    <Link
                        to="/user"
                        className="header-account text-ellipsis cursor-pointer hover:opacity-50 hover-effect "
                    >
                        Xin chào: {user.name}
                    </Link>
                </div>
                <svg
                    data-tooltip-target="tooltip-default"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer hover:opacity-50  hover-effect"
                    onClick={onClickLogOutHandler}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                </svg>
            </div>
        </Dropdown>
    );
};
