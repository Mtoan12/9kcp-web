import AboutPage from 'pages/AboutPage';
import AllProductsPage from 'pages/AllProductsPage';
import CartPage from 'pages/CartPage';
import Login from 'pages/Login';
import OrdersPage from 'pages/OrdersPage';
import ProductDetailPage from 'pages/ProductDetailPage';
import ProductsPage from 'pages/ProductsPage';
import Register from 'pages/Register';
import SearchProductsPage from 'pages/SearchProductsPage';
import Home from 'pages/home/Home';
import { Route, Routes } from 'react-router-dom';
import UserInformation from './UserInformation';

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
    {
        path: '/search',
        element: SearchProductsPage,
    },
];

const AppPages = () => {
    return (
        <Routes>
            {pages &&
                pages.map((page) => {
                    const Component = page.element;
                    return <Route key={page.path} path={page.path} element={<Component />} />;
                })}
        </Routes>
    );
};
export default AppPages;
