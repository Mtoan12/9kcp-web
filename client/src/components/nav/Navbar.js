import axios from 'axios';
import Backdrop from 'components/Backdrop';
import { API_URL } from 'constants/constance';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from 'redux/slices/auth';

const Navbar = ({ show, setShow }) => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const onClickLogOutHandler = async () => {
        await axios.get(`${API_URL}/auth/logout`);
        dispatch(logOut());
    };
    return (
        <>
            <Backdrop show={show} setShow={setShow} />
            <nav
                className={`fixed top-0 z-10 ${
                    !show
                        ? 'translate-y-[-150%]'
                        : 'translate-y-[0] flex flex-col gap-3 px-5 py-5 bg-white w-screen '
                } lg:static lg:flex lg:flex-row lg:w-full lg:p-0 lg:translate-y-0 lg:justify-around lg:items-center lg:my-4`}
            >
                <Link
                    to="/"
                    className="py-3 md:py-5 lg:py-0 lg:border-0 border-b border-b-gray-300 home hover:opacity-50  hover-effect"
                >
                    Trang chủ
                </Link>
                <Link
                    to="/products"
                    className="py-3 md:py-5 lg:py-0 lg:border-0 border-b border-b-gray-300 home hover:opacity-50  hover-effect"
                >
                    Tất cả Sản phẩm
                </Link>
                <Link
                    to="/keyboard"
                    className="py-3 md:py-5 lg:py-0 lg:border-0 border-b border-b-gray-300 home hover:opacity-50  hover-effect"
                >
                    Bàn phím cơ
                </Link>
                <Link
                    to="/keycap"
                    className="py-3 md:py-5 lg:py-0 lg:border-0 border-b border-b-gray-300 home hover:opacity-50  hover-effect"
                >
                    Keycap
                </Link>
                <Link
                    to="/kit"
                    className="py-3 md:py-5 lg:py-0 lg:border-0 border-b border-b-gray-300 home hover:opacity-50  hover-effect"
                >
                    Kit
                </Link>
                <Link
                    to="/about"
                    className="py-3 md:py-5 lg:py-0 lg:border-0 border-b border-b-gray-300 home hover:opacity-50  hover-effect"
                >
                    Giới thiệu trang
                </Link>
                <div className="lg:hidden">
                    {user ? (
                        <div className="flex flex-col gap-3">
                            {user.isAdmin && (
                                <Link
                                    to="/admin"
                                    className="py-3 md:py-5 lg:py-0 lg:border-0 border-b border-b-gray-300 home hover:opacity-50  hover-effect"
                                >
                                    Quản lý
                                </Link>
                            )}
                            <Link
                                to="/user"
                                className="py-3 md:py-5 lg:py-0 lg:border-0 border-b border-b-gray-300 home hover:opacity-50  hover-effect"
                            >
                                Thông tin tài khoản: {user.name}
                            </Link>
                            <Link
                                to="/orders"
                                className="py-3 md:py-5 lg:py-0 lg:border-0 border-b border-b-gray-300 home hover:opacity-50  hover-effect"
                            >
                                Đơn hàng của bạn
                            </Link>
                            <span
                                onClick={onClickLogOutHandler}
                                className="block w-full uppercase cursor-pointer hover:opacity-50 hover-effect"
                            >
                                Đăng xuất
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Link
                                to="/login"
                                className="py-3 md:py-5 lg:py-0 lg:border-0 border-b border-b-gray-300 home hover:opacity-50  hover-effect"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                to="/register"
                                className="py-3 md:py-5 lg:py-0 lg:border-0 border-b border-b-gray-300 home hover:opacity-50  hover-effect"
                            >
                                Đăng ký
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};
export default Navbar;
