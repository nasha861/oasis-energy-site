import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function CustomerDashboard() {
  const navigate = useNavigate();

  const name = localStorage.getItem("name") || "Customer";

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {name}</h1>

        <p>
          Welcome to your Oasis Energy customer dashboard.
        </p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>My Orders</h3>
          <p>View your solar product orders.</p>

          <button onClick={() => navigate("/auth/orders")}>
            View Orders
          </button>
        </div>

        <div className="dashboard-card">
          <h3>Solar Products</h3>
          <p>Browse our available solar products.</p>

          <button onClick={() => navigate("/auth/shop")}>
            Visit Shop
          </button>
        </div>

        <div className="dashboard-card">
          <h3>Request a Quote</h3>
          <p>Request a solar installation quote.</p>

          <button onClick={() => navigate("/quote")}>
            Request Quote
          </button>
        </div>

        <div className="dashboard-card">
          <h3>Our Services</h3>
          <p>Explore installation and maintenance services.</p>

          <button onClick={() => navigate("/services")}>
            View Services
          </button>
        </div>
        
        <div className="dashboard-card">
          <h3>My Maintenance Requests</h3>
          <p>
            Track your maintenance requests, check their status,
            view your assigned technician, and see scheduled dates.
          </p>

          <button onClick={() => navigate("/auth/my-maintenance")}>
            Track Maintenance
          </button>
        </div>
      </div>
    </section>
  );
}

export default CustomerDashboard;