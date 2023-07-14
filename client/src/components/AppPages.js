import Home from 'pages/home/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import ProductsPage from 'pages/ProductsPage';
import AllProductsPage from 'pages/AllProductsPage';
import ProductDetailPage from 'pages/ProductDetailPage';
import CartPage from 'pages/CartPage';
import { Route, Routes } from 'react-router-dom';
import OrdersPage from 'pages/OrdersPage';
import UserInformation from './UserInformation';
import AboutPage from 'pages/AboutPage';

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
        path: '/user',
        element: UserInformation,
    },
    {
        path: '/about',
        element: AboutPage,
    },
];

const AppPages = () => {
    // const paths = pages.reduce((pathsArr, page) => {
    //     return [...pathsArr, page.path];
    // }, []);

    // const location = useLocation();
    // const haveHeader =
    //     paths.includes(location.pathname) || location.pathname.startsWith('/product/');
    return (
        <>
            {/* {haveHeader && <Header />} */}
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
