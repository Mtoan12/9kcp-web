import React, { useContext, useEffect } from 'react';
import './HeaderStyles.css';
import logo from '../../img/logo.webp';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../nav/Navbar';
const Header = () => {
    const {
        logOutHandler,
        authState: { isAuthLoading, isAuthenticated, user },
    } = useContext(AuthContext);
    const onClickLogOutHandler = () => {
        logOutHandler();
    };
    return (
        <header>
            <div className="header-content px-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 lg:hidden "
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>

                <span className=" hidden lg:block">
                    HOTLINE TƯ VẤN:
                    <a className="phone-number hover:opacity-50" href="tel:0982843420">
                        0982843420
                    </a>
                </span>
                <img className="logo" src={logo} alt="logo" />
                <div className="header-right">
                    <div className="hidden lg:block">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-1">
                                <span className="header-account text-ellipsis">
                                    Xin chào: {user.name}
                                </span>
                                <svg
                                    data-tooltip-target="tooltip-default"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 cursor-pointer hover:opacity-50"
                                    onClick={onClickLogOutHandler}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                    />
                                </svg>
                            </div>
                        ) : (
                            <div className="relative uppercase cursor-pointer group">
                                Tài khoản
                                <div className="subnav hidden group-hover:block absolute top-6">
                                    <div className="flex flex-col gap-3 w-max mt-3 text-left bg-white">
                                        <Link
                                            to="/login"
                                            className="relative uppercase cursor-pointer hover:opacity-50"
                                        >
                                            Đăng nhập
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="relative uppercase cursor-pointer hover:opacity-50"
                                        >
                                            Đăng ký
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <a href="/" className="flex gap-1 items-center hover:opacity-50">
                        <span href="/" className="header-cart hidden lg:block">
                            Giỏ hàng
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                    </a>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer hover:opacity-50"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
            </div>
            <Navbar />
        </header>
    );
};

export default Header;
