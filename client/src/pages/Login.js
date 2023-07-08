import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import EyeIcon from '../components/icons/EyeIcon.js';

const Login = () => {
    useEffect(() => {
        document.title = 'Đăng nhập tài khoản';
    }, []);

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });
    const [isPasswordShowing, setIsPasswordShowing] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const {
        loginHandler,
        authState: { isAuthenticated },
    } = useContext(AuthContext);

    if (isAuthenticated) {
        navigate('/');
    }
    const { email, password } = loginForm;
    const onChangeLoginFormHandle = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    };
    const togglePasswordShowing = () => {
        setIsPasswordShowing(!isPasswordShowing);
    };
    const handleClickLoginBtn = async () => {
        try {
            const response = await loginHandler(loginForm);
            if (response.success) {
                navigate('/');
            } else {
                setMessage(response.message);
            }
        } catch (error) {
            setMessage('Đăng nhập thất bại');
        }
    };

    return (
        <>
            <h2 className="text-center mt-7 text-3xl uppercase ">Đăng nhập tài khoản</h2>
            <div className="w-[60%] mt-6 mx-auto flex justify-center items-start flex-col">
                <div className="w-full mt-3">
                    <label htmlFor="email" className="block uppercase">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full py-3 mt-3 bg-gray-100 ps-3 outline-none"
                        placeholder="Nhập Địa chỉ Email"
                        value={email}
                        name="email"
                        onChange={onChangeLoginFormHandle}
                        required
                    />
                </div>
                <div className="w-full mt-9">
                    <label htmlFor="password" className="block uppercase">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={isPasswordShowing ? 'text' : 'password'}
                            className="w-full py-2 mt-3 bg-gray-100 ps-3 outline-none"
                            placeholder="Nhập Mật khẩu"
                            value={password}
                            name="password"
                            onChange={onChangeLoginFormHandle}
                            required
                        />
                        <span className="absolute right-2 top-[35%]">
                            <EyeIcon
                                isPasswordShowing={isPasswordShowing}
                                onClick={togglePasswordShowing}
                            />
                        </span>
                    </div>
                </div>
                <span className="text-red-600 mt-6">{message}</span>
            </div>
            <div className="flex justify-center">
                <button
                    className="allBtn uppercase px-24 text-xl font-semibold"
                    onClick={handleClickLoginBtn}
                >
                    Đăng nhập
                </button>
            </div>
            <div className="flex justify-center uppercase pt-3 ">
                <span className="pe-2">Bạn chưa có tài khoản: </span>
                <Link to={'/register'} className="text-gray-400 underline">
                    Đăng ký
                </Link>
            </div>
        </>
    );
};
export default Login;
