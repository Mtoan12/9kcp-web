import './App.css';
import AuthContextProvider from './context/AuthContext';
import CartContextProvider from './context/CartContext';
import AdminAuthContextProvider from './context/AdminAuthContext';
import AppPages from './components/AppPages';
import AdminPages from './pages/AdminPages';
import Header from './components/header/Header';
import Footer from 'components/footer/Footer';

function App() {
    return (
        <div className="text-lg md:text-md lg:text-sm">
            <AuthContextProvider>
                <CartContextProvider>
                    <div className="flex flex-col justify-center items-center min-h-screen">
                        <Header />
                        <div className="container flex-1">
                            <AppPages />
                            <AdminAuthContextProvider>
                                <AdminPages />
                            </AdminAuthContextProvider>
                        </div>
                        <Footer />
                    </div>
                </CartContextProvider>
            </AuthContextProvider>
        </div>
    );
}

export default App;
