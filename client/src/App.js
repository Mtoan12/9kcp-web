import './App.css';
import CartContextProvider from './context/CartContext';
import AppPages from './components/AppPages';
import AdminPages from './pages/AdminPages';
import Header from './components/header/Header';
import Footer from 'components/footer/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from 'redux/slices/auth';
import LoadingPage from 'components/LoadingPage';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <div className="text-lg md:text-md lg:text-sm">
            <LoadingPage />
            <CartContextProvider>
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <Header />
                    <div className="container flex-grow">
                        <AppPages />
                        <AdminPages />
                    </div>
                    <Footer />
                </div>
            </CartContextProvider>
        </div>
    );
}

export default App;
