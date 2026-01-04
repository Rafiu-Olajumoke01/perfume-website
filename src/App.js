import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";


const Home = lazy(() => import('./pages/Home/Home'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Details = lazy(() => import('./pages/Details/Details'));
const Stock = lazy(() => import('./pages/Stock/Stock'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading....</div>}>
        <BrowserRouter>
        <Navbar/>
        {/* <Top/> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/stock" element={<Stock />} />
             <Route path="/products/:id" element={<Details />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;