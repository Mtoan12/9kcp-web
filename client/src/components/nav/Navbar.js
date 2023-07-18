import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="hidden lg:flex lg:justify-around lg:items-center lg:my-4">
      <Link to="/" className="home hover:opacity-50  hover-effect">
        Trang chủ
      </Link>
      <Link to="/products" className="home hover:opacity-50  hover-effect">
        Tất cả Sản phẩm
      </Link>
      <Link to="/keyboard" className="home hover:opacity-50  hover-effect">
        Bàn phím cơ
      </Link>
      <Link to="/keycap" className="home hover:opacity-50  hover-effect">
        Keycap
      </Link>
      <Link to="/kit" className="home hover:opacity-50  hover-effect">
        Kit
      </Link>
      <Link to="/about" className="home hover:opacity-50  hover-effect">
        Giới thiệu trang
      </Link>
    </nav>
  );
};
export default Navbar;
