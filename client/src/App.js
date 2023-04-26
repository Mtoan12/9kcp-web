import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import { Routes, Route } from 'react-router-dom';
import Product from './components/product/Product';
function App() {
    return (
        <div className="wrapper">
            <Header></Header>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/product" element={<Product />}></Route>
            </Routes>
        </div>
    );
}

export default App;
