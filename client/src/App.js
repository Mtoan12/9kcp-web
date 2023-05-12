import './App.css';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import { Routes, Route, useRoutes } from 'react-router-dom';
import Product from './components/product/Product';
import AuthContextProvider from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductContextProvider from './context/ProductContext';
import KeycapPage from './pages/ProductPage';
import ProductPage from './pages/ProductPage';
function App() {
    const ProductRoute = ['/keycap', '/kit', '/keyboard'].map((path) => {
        return <Route path={path} element={<ProductPage />}></Route>;
    });
    console.log(ProductRoute);
    return (
        <AuthContextProvider>
            <ProductContextProvider>
                <div className="wrapper">
                    <Header></Header>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/product" element={<Product />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        <Route path="/keycap" element={<ProductPage />}></Route>
                        <Route path="/kit" element={<ProductPage />}></Route>
                        <Route path="/keyboard" element={<ProductPage />}></Route>
                    </Routes>
                </div>
            </ProductContextProvider>
        </AuthContextProvider>
    );
}

export default App;
