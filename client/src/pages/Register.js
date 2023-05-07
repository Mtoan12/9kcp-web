import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const Register = () => {
    const [registerForm, setRegisterForm] = useState({
        email: '',
        password: '',
        name: '',
    });
    const { registerHandler } = useContext(AuthContext);
    const navigate = useNavigate();
    const { email, password, name } = registerForm;

    const onChangeRegisterFormHandle = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value,
        });
    };
    const onClickRegisterHandle = async (e) => {
        try {
            const response = await registerHandler(registerForm);
            if (response.success) {
                navigate('/');

                return response;
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <h2 className="text-center mt-7 text-3xl uppercase ">Đăng ký tài khoản</h2>
            <div className="w-[60%] mt-6 mx-auto flex justify-center items-start flex-col">
                <div className="w-full mt-3">
                    <label htmlFor="name" className="block uppercase">
                        Họ và Tên
                    </label>
                    <input
                        type="name"
                        className="w-full py-3 mt-3 bg-gray-100 ps-3 outline-none"
                        placeholder="Nhập Họ và Tên"
                        name="name"
                        value={name}
                        onChange={onChangeRegisterFormHandle}
                        required
                    />
                </div>
                <div className="w-full mt-9">
                    <label htmlFor="email" className="block uppercase">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full py-2 mt-3 bg-gray-100 ps-3 outline-none"
                        placeholder="Nhập Địa chỉ Email"
                        name="email"
                        value={email}
                        onChange={onChangeRegisterFormHandle}
                        required
                    />
                </div>
                <div className="w-full mt-9">
                    <label htmlFor="password" className="block uppercase">
                        Password
                    </label>
                    <input
                        type="password"
                        className="w-full py-2 mt-3 bg-gray-100 ps-3 outline-none"
                        placeholder="Nhập Mật khẩu"
                        name="password"
                        value={password}
                        onChange={onChangeRegisterFormHandle}
                        required
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    className="allBtn uppercase px-24 text-3xl font-semibold"
                    onClick={onClickRegisterHandle}
                >
                    Đăng ký
                </button>
            </div>
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
