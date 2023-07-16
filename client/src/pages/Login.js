import axios from 'axios';
import { API_URL, LOCAL_STORAGE_ACCESS_TOKEN_NAME } from 'constants/constance.js';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loadUser } from 'redux/slices/auth.js';
import { loginSchema } from 'schemas/basic.js';
import EyeIcon from '../components/icons/EyeIcon.js';

const Login = () => {
    const [isPasswordShowing, setIsPasswordShowing] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Đăng nhập tài khoản';
    }, []);

    const timeOutRef = useRef();
    useEffect(() => {
        if (timeOutRef.current !== null) {
            clearTimeout(timeOutRef.current);
        }
        timeOutRef.current = setTimeout(() => {
            timeOutRef.current = null;
            setMessage('');
        }, 3000);
    }, [message]);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const { values, handleChange, touched, errors, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            handleClickLoginBtn(values);
        },
    });

    if (isAuthenticated) {
        return navigate('/');
    }

    const togglePasswordShowing = () => {
        setIsPasswordShowing(!isPasswordShowing);
    };

    const loginHandler = async (user) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, user);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME, response.data.accessToken);

                dispatch(loadUser());
                return response.data;
            }
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            } else {
                return {
                    success: false,
                    message: error.message,
                };
            }
        }
    };

    const handleClickLoginBtn = async (values) => {
        try {
            const response = await loginHandler({ email: values.email, password: values.password });
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
            <form onSubmit={handleSubmit}>
                <div className="w-[60%] mt-6 mx-auto flex justify-center items-start flex-col">
                    <div className="w-full flex flex-col gap-2 mt-3">
                        <label htmlFor="email" className="block uppercase">
                            Email
                        </label>
                        <input
                            type="email"
                            className={`w-full py-3 mt-3 bg-gray-100 ps-3 outline-none ${
                                errors.email && 'error-input'
                            }`}
                            placeholder="Nhập Địa chỉ Email"
                            value={values.email}
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>
                    <div className="w-full flex flex-col gap-2 mt-9">
                        <label htmlFor="password" className="block uppercase">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={isPasswordShowing ? 'text' : 'password'}
                                className={`w-full py-3 mt-3 bg-gray-100 ps-3 outline-none ${
                                    errors.password && 'error-input'
                                }`}
                                placeholder="Nhập Mật khẩu"
                                value={values.password}
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <span className="absolute right-2 top-[35%]">
                                <EyeIcon
                                    isPasswordShowing={isPasswordShowing}
                                    onClick={togglePasswordShowing}
                                />
                            </span>
                        </div>
                        {errors.password && touched.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>
                    <span className="text-red-600 mt-6">{message}</span>
                </div>
                <div className="flex justify-center">
                    <button className="allBtn uppercase px-24 text-xl font-semibold" type="submit">
                        Đăng nhập
                    </button>
                </div>
            </form>
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
