import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import WhatsAppButton from "./components/Button/Button";  



const Home = lazy(() => import('./pages/Home/Home'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout'));
const Payment = lazy(() => import('./pages/Payment/Payment'));
const Details = lazy(() => import('./pages/Details/Details'));
const Stock = lazy(() => import('./pages/Stock/Stock'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const Login = lazy(() => import('./pages/Login/Login'));
const Admin = lazy(() => import('./pages/dashboard/admin/Admin'))

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
             <Route path="/signup" element={<Signup />} />
             <Route path="/login" element={<Login />} />
             <Route path="/Checkout" element={<Checkout />} />
             <Route path="/Payment" element={<Payment />} />
             <Route path="/dashboard/admin" element={<Admin />} />
          </Routes>
          <Footer/>
          <WhatsAppButton />  
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;