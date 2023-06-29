import './App.css';
import AuthContextProvider from './context/AuthContext';
import CartContextProvider from './context/CartContext';
import AdminAuthContextProvider from './context/AdminAuthContext';
import AppPages from './components/AppPages';
import AdminPages from './pages/AdminPages';
import Header from './components/header/Header';

function App() {
    return (
        <div className="container mx-auto  text-sm md:text-md lg:text-lg">
            <AuthContextProvider>
                <CartContextProvider>
                    <Header />
                    <div>
                        <AppPages />
                    </div>
                    <AdminAuthContextProvider>
                        <AdminPages />
                    </AdminAuthContextProvider>
                </CartContextProvider>
            </AuthContextProvider>
        </div>
    );
}

export default App;
