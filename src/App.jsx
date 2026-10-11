import { Routes, Route } from "react-router-dom";

import Header from "./components/Home/Header";   
import Footer from "./components/Home/Footer";   

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Quote from "./pages/Auth/Quote";
import Shop from "./pages/Auth/shop";
import Checkout from "./pages/Auth/Checkout";
import Orders from "./pages/Auth/orders";
import PaymentVerify from "./pages/Auth/PaymentVerify";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Admin/Users";
import SolarProducts from "./pages/Admin/SolarProducts";
import Quotes from "./pages/Admin/Quotes";
import Technicians from "./pages/Admin/Technicians";
import Services from "./pages/Admin/Services";
import ServiceRequests from "./pages/Admin/ServiceRequests";

import HomePage from "./pages/Public/homePage";
import AboutPage from "./pages/Public/aboutPage";
import Project from "./pages/Public/project";
import MoreProject from "./pages/Public/moreProject";


import ServicesPage from "./pages/Services/services";
import Installation from "./pages/Services/installation";
import Sales from "./pages/Services/sales";
import Maintenance from "./pages/Services/maintenance";
import MyMaintenance from "./pages/Auth/MyMaintenance";

import EnergySolution from "./pages/EnergySolution/energySolution";
import BetterSolarPanel from "./pages/EnergySolution/betterSolarPanel";
import BatteryStorage from "./pages/EnergySolution/batteryStorage";

import ContactPage from "./pages/Support/contact";
import Blog from "./pages/Support/blog";

import ScrollToTop from "./components/ScrollToTop";


function App() {
  return (
    <>
      <Header />   {/* ✅ NOW SHOWS ON ALL PAGES */}

      <ScrollToTop />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/solar-products" element={<SolarProducts />} />
        <Route path="/admin/quotes" element={<Quotes />} />
        <Route path="/admin/technicians" element={<Technicians />} />
        <Route path="/admin/services" element={<Services />} />
        <Route path="/admin/service-requests" element={<ServiceRequests />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/installation" element={<Installation />} />
        <Route path="/services/sales" element={<Sales />} />
        <Route path="/auth/shop" element={<Shop />} />
        <Route path="/auth/checkout" element={<Checkout />} />
        <Route path="/auth/orders" element={<Orders />} />
        <Route path="/payment/verify" element={<PaymentVerify />} />
        <Route path="/services/maintenance" element={<Maintenance />} />
        <Route path="/auth/my-maintenance" element={<MyMaintenance />} />
        <Route path="/energy-solutions" element={<EnergySolution />} />
        <Route path="/energy-solutions/better-solar-panel" element={<BetterSolarPanel /> } />
        <Route path="/energy-solutions/solar-battery-storage" element={<BatteryStorage />} />
        <Route path="/about/projects" element={<Project />} />
        <Route path="/about/more-projects" element={<MoreProject />} />
        <Route path="/support/blog" element={<Blog />} />
      </Routes>

      <Footer />   {/* ✅ NOW SHOWS ON ALL PAGES */}
    </>
  );
}

export default App;