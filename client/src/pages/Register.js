import { Link } from 'react-router-dom';
const Register = () => {
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
                <button className="allBtn uppercase px-24 text-3xl font-semibold">Đăng ký</button>
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
