import './App.css';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import { Routes, Route } from 'react-router-dom';
import Product from './components/product/Product';
import AuthContextProvider from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
    return (
        <AuthContextProvider>
            <div className="wrapper">
                <Header></Header>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/product" element={<Product />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Routes>
            </div>
        </AuthContextProvider>
    );
}

export default App;
