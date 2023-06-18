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
import { useContext, useEffect } from 'react';
function App() {
    return (
        <AuthContextProvider>
            <CartContextProvider>
                <div className="container mx-auto  text-sm md:text-md lg:text-lg">
                    <Header></Header>
                    <div className="pb-20">
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/product" element={<Product />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/register" element={<Register />}></Route>
                            <Route path="/products" element={<AllProductsPage />}></Route>
                            <Route path="/keycap" element={<ProductsPage />}></Route>
                            <Route path="/kit" element={<ProductsPage />}></Route>
                            <Route path="/keyboard" element={<ProductsPage />}></Route>
                            <Route path="/product/:id" element={<ProductDetailPage />}></Route>
                            <Route path="/cart" element={<CartPage />}></Route>
                        </Routes>
                    </div>
                </div>
            </CartContextProvider>
        </AuthContextProvider>
    );
}

export default App;
