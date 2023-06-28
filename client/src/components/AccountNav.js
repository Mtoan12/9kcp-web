import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';

const AccountNav = () => {
    const items = [
        {
            key: '1',
            label: (
                <Link
                    to="/login"
                    className="uppercase cursor-pointer hover:opacity-50 hover-effect"
                >
                    Đăng nhập
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link
                    to="/register"
                    className="uppercase cursor-pointer hover:opacity-50 hover-effect"
                >
                    Đăng ký
                </Link>
            ),
        },
    ];

    return (
        <div className="uppercase cursor-pointer hover:opacity-50 hover-effect">
            <Dropdown
                menu={{ items }}
                placement="bottom"
                arrow={{
                    pointAtCenter: true,
                }}
            >
                <span>Tài khoản</span>
            </Dropdown>
        </div>
        // <div className="relative uppercase cursor-pointer group">
        //     Tài khoản
        //     <div className="subnav hidden group-hover:block hover-effect absolute top-6">
        //         <div className="flex flex-col gap-3 w-max mt-3 text-left bg-white">
        //             <Link
        //                 to="/login"
        //                 className="relative uppercase cursor-pointer hover:opacity-50 hover-effect"
        //             >
        //                 Đăng nhập
        //             </Link>
        //             <Link
        //                 to="/register"
        //                 className="relative uppercase cursor-pointer hover:opacity-50 hover-effect"
        //             >
        //                 Đăng ký
        //             </Link>
        //         </div>
        //     </div>
        // </div>
    );
};
export default AccountNav;
