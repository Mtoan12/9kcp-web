import React, { useContext } from 'react';
import './HeaderStyles.css';
import logo from '../../img/logo.webp';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
const Header = () => {
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
                    <Link to="/login" className="header-account">
                        Tài khoản
                    </Link>
                    <a href="/" className="header-cart">
                        Giỏ hàng
                    </a>
                </div>
            </div>
            <nav class="header-nav">
                <a href="/" class="home">
                    Trang chủ
                </a>
                <a href="/" class="home">
                    Keycap bộ
                </a>
                <a href="/" class="home">
                    Mods phím
                </a>
                <a href="/" class="home">
                    Keycap lẻ
                </a>
                <a href="/" class="home">
                    Combo chất
                </a>
                <a href="/" class="home">
                    Sản phẩm
                </a>
                <a href="/" class="home">
                    Blog
                </a>
                <a href="/" class="home">
                    Về keycap
                </a>
            </nav>
        </div>
    );
};

export default Header;
