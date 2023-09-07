import Footer from 'components/footer/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from 'redux/slices/auth';
import './App.css';
import AppPages from './components/AppPages';
import Header from './components/header/Header';
import CartContextProvider from './context/CartContext';
import AdminPages from './pages/AdminPages';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <div className="text-md lg:text-sm">
            <CartContextProvider>
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <Header />
                    <div className="container flex-grow lg:px-3">
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
