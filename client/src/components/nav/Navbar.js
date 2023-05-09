import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="hidden lg:flex lg:justify-around lg:items-center lg:my-4">
            <Link to="/" className="home hover:opacity-50">
                Trang chủ
            </Link>
            <Link to="/" className="home hover:opacity-50">
                Tất cả Sản phẩm
            </Link>
            <Link to="/" className="home hover:opacity-50">
                Bàn phím cơ
            </Link>
            <Link to="/" className="home hover:opacity-50">
                Keycap
            </Link>
            <Link to="/" className="home hover:opacity-50">
                Kit
            </Link>
            <Link to="/" className="home hover:opacity-50">
                Về keycap
            </Link>
        </nav>
    );
};
export default Navbar;
