import axios from 'axios';
import { API_URL, LOCAL_STORAGE_ACCESS_TOKEN_NAME } from 'constants/constance';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loadUser } from 'redux/slices/auth';
import { basicSchema } from 'schemas/basic';
import EyeIcon from '../components/icons/EyeIcon';
const Register = () => {
    const [isPasswordShowing, setIsPasswordShowing] = useState(false);
    const [message, setMessage] = useState('');
    const timeOutRef = useRef(null);

    useEffect(() => {
        document.title = 'Đăng ký tài khoản';
    }, []);

    useEffect(() => {
        if (timeOutRef.current !== null) {
            clearTimeout(timeOutRef.current);
        }
        timeOutRef.current = setTimeout(() => {
            timeOutRef.current = null;
            setMessage('');
        }, 3000);
    }, [message]);

    const navigate = useNavigate();
    const { values, handleChange, touched, errors, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: basicSchema,
        onSubmit: async (values) => {
            try {
                const response = await registerHandler({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                });
                if (response.success) {
                    navigate(-1);

                    return response;
                } else {
                    setMessage(response.message);
                }
            } catch (error) {
                console.log(error);
                setMessage('Đăng ký thất bại');
            }
        },
    });

    // const { email, password, name } = registerForm;

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const togglePasswordShowing = () => {
        setIsPasswordShowing(!isPasswordShowing);
    };

    const registerHandler = async (user) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, user);
            if (response.data.success) {
                // localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME, response.data.accessToken);

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

    if (isAuthenticated) {
        return navigate('/');
    }
    return (
        <>
            <h2 className="text-center mt-7 text-3xl uppercase ">Đăng ký tài khoản</h2>
            <form onSubmit={handleSubmit}>
                <div className="w-[60%] mt-6 mx-auto flex justify-center items-start flex-col">
                    <div className="w-full flex flex-col gap-2 mt-3">
                        <label htmlFor="name" className="block uppercase">
                            Họ và Tên
                        </label>
                        <input
                            type="name"
                            className={`'w-full py-3 mt-3 border-input bg-gray-100 ps-3 outline-none' ${
                                errors.name && touched.name && 'error-input'
                            }`}
                            placeholder="Nhập Họ và Tên"
                            name="name"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {errors.name && touched.name && (
                            <span className="error-message">{errors.name}</span>
                        )}
                    </div>
                    <div className="w-full flex flex-col gap-2 mt-9">
                        <label htmlFor="email" className="block uppercase">
                            Email
                        </label>
                        <input
                            type="email"
                            className={`w-full py-3 mt-3 bg-gray-100 ps-3 outline-none  ${
                                errors.email && touched.email && 'error-input'
                            }`}
                            placeholder="Nhập Địa chỉ Email"
                            name="email"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
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
                                className={`w-full py-3 mt-3 bg-gray-100 ps-3 outline-none  ${
                                    errors.password && touched.password && 'error-input'
                                }`}
                                placeholder="Nhập Mật khẩu"
                                name="password"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                    <button className="allBtn uppercase px-24 text-3xl font-semibold" type="submit">
                        Đăng ký
                    </button>
                </div>
            </form>
            <div className="flex justify-center uppercase pt-3 ">
                <span className="pe-2">Bạn đã có tài khoản: </span>
                <Link to={'/login'} className="text-gray-400 underline">
                    Đăng nhập
                </Link>
            </div>
        </>
    );
};
export default Register;
