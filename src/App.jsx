import { Routes, Route } from "react-router-dom";

import Header from "./components/Home/Header";   
import Footer from "./components/Home/Footer";   

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Quote from "./pages/Auth/Quote";
import Shop from "./pages/Auth/shop";
import Checkout from "./pages/Auth/Checkout";
import Orders from "./pages/Auth/Orders";
import PaymentVerify from "./pages/Auth/PaymentVerify";

import HomePage from "./pages/Public/homePage";
import AboutPage from "./pages/Public/aboutPage";
import ContactPage from "./pages/Public/contact";
import ServicesPage from "./pages/Services/services";
import Installation from "./pages/Services/installation";
import Sales from "./pages/Services/sales";




function App() {
  return (
    <>
      <Header />   {/* ✅ NOW SHOWS ON ALL PAGES */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/installation" element={<Installation />} />
        <Route path="/services/sales" element={<Sales />} />
        <Route path="/auth/shop" element={<Shop />} />
        <Route path="/auth/checkout" element={<Checkout />} />
        <Route path="/auth/orders" element={<Orders />} />
        <Route path="/payment/verify" element={<PaymentVerify />} />
      </Routes>

      <Footer />   {/* ✅ NOW SHOWS ON ALL PAGES */}
    </>
  );
}

export default App;