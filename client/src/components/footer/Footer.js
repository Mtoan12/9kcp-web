import logo from 'img/logo.webp';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="bg-secondary w-screen py-5 mt-14 lg:px-20">
            <div className="grid grid-cols-12 gap-2 place-items-center items-center justify-between">
                <div className="col-span-12 lg:col-span-4">
                    <Link to="/">
                        <img className="max-w-[70%] mx-auto" src={logo} alt="logo" />
                    </Link>
                </div>

                <span className="col-span-12 lg:col-span-4">
                    &#169; 2023 Kicap. All rights reserved.
                </span>

                <div className="w-[70%] flex flex-col gap-5 col-span-12 lg:col-span-4">
                    <div className="flex items-center relative">
                        <input
                            className="px-5 py-3 rounded-lg w-full flex-grow"
                            placeholder="Bạn cần hỗ trợ"
                        />
                        <button className="bg-black text-white px-5 py-3 rounded-lg absolute right-0">
                            Gửi
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
