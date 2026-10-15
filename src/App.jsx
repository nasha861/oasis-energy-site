import { Routes, Route } from "react-router-dom";

import Header from "./components/Home/Header";   
import Footer from "./components/Home/Footer";   
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Auth/login.jsx";
import Register from "./pages/Auth/register.jsx";
import Quote from "./pages/Auth/quote.jsx";
import Shop from "./pages/Auth/shop";
import Checkout from "./pages/Auth/checkout.jsx";
import Orders from "./pages/Auth/orders";
import PaymentVerify from "./pages/Auth/PaymentVerify";
import Dashboard from "./pages/Dashboard/Dashboard";
import TechnicianInstallations from "./pages/Dashboard/TechnicianInstallations";
import TechnicianMaintenance from "./pages/Dashboard/TechnicianMaintenance";
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
import Maintenance from "./pages/Services/Maintenance.jsx";
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
        
        <Route path="/technician/installations" element={ <ProtectedRoute allowedRoles={["technician"]}> <TechnicianInstallations /> </ProtectedRoute> } />
        <Route path="/technician/maintenance" element={ <ProtectedRoute allowedRoles={["technician"]}> <TechnicianMaintenance /> </ProtectedRoute> } />
        <Route path="/admin/users" element={ <ProtectedRoute allowedRoles={["admin"]}> <Users /> </ProtectedRoute> } />
        <Route path="/admin/solar-products" element={ <ProtectedRoute allowedRoles={["admin"]}> <SolarProducts />  </ProtectedRoute>  } />
        <Route path="/admin/quotes" element={ <ProtectedRoute allowedRoles={["admin"]}> <Quotes /> </ProtectedRoute> } />
        <Route path="/admin/technicians" element={ <ProtectedRoute allowedRoles={["admin"]}> <Technicians /> </ProtectedRoute> } />
        <Route path="/admin/services" element={ <ProtectedRoute allowedRoles={["admin"]}> <Services /> </ProtectedRoute>  } />
        <Route path="/admin/service-requests" element={ <ProtectedRoute allowedRoles={["admin"]}><ServiceRequests /> </ProtectedRoute>} />

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