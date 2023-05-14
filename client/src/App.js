import './App.css';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import { Routes, Route } from 'react-router-dom';
import Product from './components/product/Product';
import AuthContextProvider from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductContextProvider from './context/ProductContext';
import ProductsPage from './pages/ProductsPage';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
function App() {
    return (
        <AuthContextProvider>
            <ProductContextProvider>
                <div className="container mx-auto">
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
                        </Routes>
                    </div>
                </div>
            </ProductContextProvider>
        </AuthContextProvider>
    );
}

export default App;
