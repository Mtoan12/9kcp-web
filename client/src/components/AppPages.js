import Home from '../pages/home/Home';
import Product from '../components/product/Product';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProductsPage from '../pages/ProductsPage';
import AllProductsPage from '../pages/AllProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import Header from './header/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import NotExistPage from '../pages/NotExistPage/NotExistPage';
import OrdersPage from '../pages/OrdersPage';

const pages = [
    {
        path: '/',
        element: Home,
    },
    {
        path: '/login',
        element: Login,
    },
    {
        path: '/register',
        element: Register,
    },
    {
        path: '/products',
        element: AllProductsPage,
    },
    {
        path: '/keycap',
        element: ProductsPage,
    },
    {
        path: '/kit',
        element: ProductsPage,
    },
    {
        path: '/keyboard',
        element: ProductsPage,
    },
    {
        path: '/product/:id',
        element: ProductDetailPage,
    },
    {
        path: '/cart',
        element: CartPage,
    },
    {
        path: '/orders',
        element: OrdersPage,
    },
    {
        path: '*',
        element: NotExistPage,
    },
];

const AppPages = () => {
    const paths = pages.reduce((pathsArr, page) => {
        return [...pathsArr, page.path];
    }, []);

    const location = useLocation();
    const haveHeader =
        paths.includes(location.pathname) || location.pathname.startsWith('/product/');
    return (
        <>
            {haveHeader && <Header />}
            <Routes>
                {pages &&
                    pages.map((page) => {
                        const Component = page.element;
                        return <Route key={page.path} path={page.path} element={<Component />} />;
                    })}
            </Routes>
        </>
    );
};
export default AppPages;
