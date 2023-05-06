import React, { useContext, useEffect } from 'react';
import './HeaderStyles.css';
import logo from '../../img/logo.webp';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
const Header = () => {
    const {
        logOutHandler,
        authState: { isAuthLoading, isAuthenticated, user },
    } = useContext(AuthContext);
    const onClickLogOutHandler = () => {
        logOutHandler();
    };
    return (
        <div id="header">
            <div className="header-content">
                <span>
                    HOTLINE TƯ VẤN:
                    <a className="phone-number" href="tel:0369161095">
                        0982843420
                    </a>
                </span>
                <img className="logo" src={logo} alt="logo" />
                <div className="header-right">
                    {isAuthenticated ? (
                        <>
                            <span className="header-account text-ellipsis">
                                Xin chào: {user.name}
                            </span>
                            <svg
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
                        </>
                    ) : (
                        <Link to="/login" className="header-account">
                            Tài khoản
                        </Link>
                    )}

                    <a href="/" className="header-cart">
                        Giỏ hàng
                    </a>
                </div>
            </div>
            <nav className="header-nav">
                <a href="/" className="home">
                    Trang chủ
                </a>
                <a href="/" className="home">
                    Keycap bộ
                </a>
                <a href="/" className="home">
                    Mods phím
                </a>
                <a href="/" className="home">
                    Keycap lẻ
                </a>
                <a href="/" className="home">
                    Combo chất
                </a>
                <a href="/" className="home">
                    Sản phẩm
                </a>
                <a href="/" className="home">
                    Blog
                </a>
                <a href="/" className="home">
                    Về keycap
                </a>
            </nav>
        </div>
    );
};

export default Header;
