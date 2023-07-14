import logo from 'img/logo.webp';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="bg-secondary w-screen py-10 mt-14 px-20">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex items-center relative">
                        <input
                            className="px-5 py-3 rounded-lg w-full "
                            placeholder="Bạn cần hỗ trợ"
                        />
                        <button className="bg-black text-white px-5 py-3 rounded-lg absolute right-0">
                            Gửi
                        </button>
                    </div>
                    <span className="text-lg">&#169; 2023 Kicap. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
