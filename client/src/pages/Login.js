import { Link } from 'react-router-dom';
const Login = () => {
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
                        required
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <button className="allBtn uppercase px-24 text-xl font-semibold">Đăng nhập</button>
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
