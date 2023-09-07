import { Route, Routes } from 'react-router-dom';
import UserInformation from './UserInformation';
import { Suspense, lazy } from 'react';
import Loading from './Loading';

const AboutPage = lazy(() => import('pages/AboutPage'));
const AllProductsPage = lazy(() => import('pages/AllProductsPage'));
const CartPage = lazy(() => import('pages/CartPage'));
const Login = lazy(() => import('pages/Login'));
const OrdersPage = lazy(() => import('pages/OrdersPage'));
const ProductDetailPage = lazy(() => import('pages/ProductDetailPage'));
const ProductsPage = lazy(() => import('pages/ProductsPage'));
const Register = lazy(() => import('pages/Register'));
const SearchProductsPage = lazy(() => import('pages/SearchProductsPage'));
const Home = lazy(() => import('pages/home/Home'));

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
        <Suspense fallback={Loading}>
            <Routes>
                {pages &&
                    pages.map((page) => {
                        const Component = page.element;
                        return <Route key={page.path} path={page.path} element={<Component />} />;
                    })}
            </Routes>
        </Suspense>
    );
};
export default AppPages;
