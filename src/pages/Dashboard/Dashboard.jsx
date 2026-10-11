import { Navigate } from "react-router-dom";

import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./CustomerDashboard";
import TechnicianDashboard from "./TechnicianDashboard";

function Dashboard() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // User is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Admin dashboard
  if (role === "admin") {
    return <AdminDashboard />;
  }

  // Technician dashboard
  if (role === "technician") {
    return <TechnicianDashboard />;
  }

  // Customer dashboard
  return <CustomerDashboard />;
}

export default Dashboard;