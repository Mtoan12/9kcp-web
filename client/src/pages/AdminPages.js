import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminMenu from '../components/AdminMenu';
import AdminOrderPage from './AdminOrderPage';
import AdminProductPage from './AdminProductPage';

const pages = [
    { path: '/admin/products', element: AdminProductPage },
    { path: '/admin/keyboards', element: AdminProductPage },
    { path: '/admin/kits', element: AdminProductPage },
    { path: '/admin/keycaps', element: AdminProductPage },
    { path: '/admin/orders', element: AdminOrderPage },
];

const AdminPages = () => {
    const user = useSelector((state) => state.auth.user);
    const { pathname } = useLocation();
    if (!user || !user.isAdmin) {
        return;
    }
    const paths = pages.map((page) => page.path);

    // const haveHeader =
    //     paths.includes(location.pathname) || location.pathname.startsWith('/product/');
    return (
        <div className="self-start flex gap-5">
            {/* {haveHeader && <Header />} */}
            {paths.includes(pathname) && (
                <div>
                    <AdminMenu />
                </div>
            )}
            <div className="flex-grow">
                <Routes>
                    {pages &&
                        pages.map((page) => {
                            const Component = page.element;
                            return (
                                <Route key={page.path} path={page.path} element={<Component />} />
                            );
                        })}
                </Routes>
            </div>
        </div>
    );
};
export default AdminPages;
