import './App.css';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import { Routes, Route } from 'react-router-dom';
import Product from './components/product/Product';
import AuthContextProvider, { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductsPage from './pages/ProductsPage';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CartContextProvider from './context/CartContext';
import AdminPage from './pages/AdminPage';
import AdminAuthContextProvider from './context/AdminAuthContext';
import AppPages from './components/AppPages';
function App() {
    return (
        <div>
            <AuthContextProvider>
                <CartContextProvider>
                    <div className="container mx-auto  text-sm md:text-md lg:text-lg">
                        <AppPages />
                    </div>
                </CartContextProvider>
            </AuthContextProvider>
        </div>
    );
}

export default App;
