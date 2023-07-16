import { Input } from 'antd';
import AccountNav from 'components/AccountNav';
import { UserNav } from 'components/UserNav';
import Navbar from 'components/nav/Navbar';
import { CartContext } from 'context/CartContext';
import logo from 'img/logo.webp';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from 'redux/slices/auth';
import './HeaderStyles.css';

const Header = () => {
    const inputRef = useRef(null);
    const [inputShowing, setInputShowing] = useState(false);
    const [infoShowing, setInfoShowing] = useState(true);
    const [searchText, setSearchText] = useState('');
    const { loadCart, productsCartQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        loadCart();
    }, []);

    useEffect(() => {
        if (inputShowing) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [inputShowing]);

    const onClickLogOutHandler = () => {
        dispatch(logOut());
    };

    const handleOnEnter = (e) => {
        if (e.key === 'Enter') {
            searchText && navigate(`/search?query=${searchText}`);
        }
    };

    const searchHandle = () => {
        if (inputShowing) {
            searchText && navigate(`/search?query=${searchText}`);
        }
        setInfoShowing(!infoShowing);
        setInputShowing(!inputShowing);
    };
    return (
        <header className="container">
            <div className="grid grid-cols-12 px-2 border-b-[1px]">
                <div className="flex justify-start lg:justify-center items-center col-span-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="lg:hidden w-6 "
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                    <span className=" hidden lg:flex">
                        HOTLINE TƯ VẤN:
                        <a
                            className="phone-number hover:opacity-50 hover-effect"
                            href="tel:0982843420"
                        >
                            0982843420
                        </a>
                    </span>
                </div>
                <Link to="/" className="col-span-4 flex justify-center items-center">
                    <img
                        className={`logo ${!infoShowing && 'hidden lg:inline-block '}`}
                        src={logo}
                        alt="logo"
                    />
                </Link>
                <div className="col-span-4 flex justify-end lg:justify-center items-center gap-4">
                    <div className={`hidden lg:block ${!infoShowing && 'lg:hidden'}`}>
                        {user ? (
                            <UserNav
                                user={user}
                                isAuthenticated={isAuthenticated}
                                onClickLogOutHandler={onClickLogOutHandler}
                            />
                        ) : (
                            <AccountNav />
                        )}
                    </div>

                    <Link
                        to="/cart"
                        className={`flex gap-1 items-center hover:opacity-50  hover-effect ${
                            !infoShowing && 'hidden'
                        }`}
                    >
                        <span className="header-cart hidden lg:block">Giỏ hàng</span>
                        <div className="relative">
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
                            <span className="absolute top-[-12px] right-[-10px] rounded-full bg-black text-white flex items-center justify-center w-[20px] h-[20px]">
                                {productsCartQuantity}
                            </span>
                        </div>
                    </Link>
                    <Input
                        ref={inputRef}
                        size="small"
                        className={`${!inputShowing && 'hidden focus'}`}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={handleOnEnter}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer hover:opacity-50 hover-effect pointer-events-auto"
                        onClick={searchHandle}
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
