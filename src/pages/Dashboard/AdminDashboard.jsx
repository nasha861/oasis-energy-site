import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";

import "./Dashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  // ==============================
  // STATE
  // ==============================

  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [services, setServices] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [maintenance, setMaintenance] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==============================
  // FETCH DASHBOARD DATA
  // ==============================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [
          ordersResponse,
          customersResponse,
          productsResponse,
          quotesResponse,
          techniciansResponse,
          servicesResponse,
          installationsResponse,
          maintenanceResponse
        ] = await Promise.all([
          api.get("/orders"),
          api.get("/customers"),
          api.get("/solar-products"),
          api.get("/quotes"),
          api.get("/technicians"),
          api.get("/services"),
          api.get("/installations"),
          api.get("/maintenance")
        ]);

        setOrders(
          ordersResponse.data.data || []
        );

        setCustomers(
          customersResponse.data.data || []
        );

        setProducts(
          productsResponse.data.data || []
        );

        setQuotes(
          quotesResponse.data.data || []
        );

        setTechnicians(
          techniciansResponse.data.data || []
        );

        setServices(
          servicesResponse.data.data || []
        );

        setInstallations(
          installationsResponse.data.data || []
        );

        setMaintenance(
          maintenanceResponse.data.data || []
        );

      } catch (error) {
        console.error(
          "Fetch admin dashboard data error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ==============================
  // DASHBOARD
  // ==============================

  return (
    <section className="dashboard">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="dashboard-header">

        <h1>
          Admin Dashboard
        </h1>

        <p>
          Welcome to the Oasis Energy
          administration dashboard.
        </p>

      </div>


      {/* ==============================
          SUMMARY CARDS
      ============================== */}

      <div className="dashboard-cards">

        {/* USERS */}

        <div className="dashboard-card">

          <h3>
          Customers
        </h3>

        {loading ? (
          <p>
            Loading customers...
          </p>
        ) : (
          <p>
            Total Customers:{" "}
            <strong>
              {customers.length}
            </strong>
          </p>
        )}

        <button
          type="button"
          className="dashboard-button"
          onClick={() =>
            navigate("/admin/users")
          }
        >
          Manage Customers
        </button>

        </div>


        {/* ORDERS */}

        <div className="dashboard-card">

          <h3>
            Orders
          </h3>

          {loading ? (
            <p>
              Loading orders...
            </p>
          ) : (
            <p>
              Total Orders:{" "}
              <strong>
                {orders.length}
              </strong>
            </p>
          )}

          <button
            type="button"
            className="dashboard-button"
            onClick={() =>
              navigate("/auth/orders")
            }
          >
            View Orders
          </button>

        </div>


        {/* SOLAR PRODUCTS */}

        <div className="dashboard-card">

          <h3>
            Solar Products
          </h3>

          {loading ? (
            <p>
              Loading products...
            </p>
          ) : (
            <p>
              Total Products:{" "}
              <strong>
                {products.length}
              </strong>
            </p>
          )}

          <button
            type="button"
            className="dashboard-button"
            onClick={() =>
              navigate(
                "/admin/solar-products"
              )
            }
          >
            Manage Products
          </button>

        </div>


        {/* QUOTES */}

        <div className="dashboard-card">

          <h3>
            Quotes
          </h3>

          {loading ? (
            <p>
              Loading quotes...
            </p>
          ) : (
            <p>
              Total Quotes:{" "}
              <strong>
                {quotes.length}
              </strong>
            </p>
          )}

          <button
            type="button"
            className="dashboard-button"
            onClick={() =>
              navigate("/admin/quotes")
            }
          >
            Manage Quotes
          </button>

        </div>


        {/* TECHNICIANS */}

        <div className="dashboard-card">

          <h3>
            Technicians
          </h3>

          {loading ? (
            <p>
              Loading technicians...
            </p>
          ) : (
            <p>
              Total Technicians:{" "}
              <strong>
                {technicians.length}
              </strong>
            </p>
          )}

          <button
            type="button"
            className="dashboard-button"
            onClick={() =>
              navigate(
                "/admin/technicians"
              )
            }
          >
            Manage Technicians
          </button>

        </div>


        {/* SERVICES */}

        <div className="dashboard-card">

          <h3>
            Services
          </h3>

          {loading ? (
            <p>
              Loading services...
            </p>
          ) : (
            <p>
              Total Services:{" "}
              <strong>
                {services.length}
              </strong>
            </p>
          )}

          <button
            type="button"
            className="dashboard-button"
            onClick={() =>
              navigate("/admin/services")
            }
          >
            Manage Services
          </button>

        </div>


        {/* SERVICE REQUESTS */}

        <div className="dashboard-card">

          <h3>
            Service Requests
          </h3>

          {loading ? (
            <p>
              Loading requests...
            </p>
          ) : (
            <p>
              Total Requests:{" "}
              <strong>
                {installations.length +
                  maintenance.length}
              </strong>
            </p>
          )}

          <button
            type="button"
            className="dashboard-button"
            onClick={() =>
              navigate(
                "/admin/service-requests"
              )
            }
          >
            Manage Requests
          </button>

        </div>


        {/* INSTALLATIONS */}

        <div className="dashboard-card">

          <h3>
            Installations
          </h3>

          {loading ? (
            <p>
              Loading installations...
            </p>
          ) : (
            <p>
              Total Installations:{" "}
              <strong>
                {installations.length}
              </strong>
            </p>
          )}

          <button
            type="button"
            className="dashboard-button"
            onClick={() =>
              navigate(
                "/admin/service-requests"
              )
            }
          >
            View Installations
          </button>

        </div>

      </div>


      {/* ==============================
          RECENT ORDERS
      ============================== */}

        <div className="recent-orders">

      <h2>
        Recent Orders
      </h2>

      {loading ? (

        <p>
          Loading orders...
        </p>

      ) : orders.length === 0 ? (

        <p>
          No orders found.
        </p>

      ) : (

        orders
          .slice(0, 5)
          .map((order) => (

            <div
              className="order-row"
              key={order._id}
            >

              <div>
                <strong>
                  Customer:
                </strong>{" "}
                {order.userId?.name ||
                  order.customerInfo?.fullName ||
                  "Unknown"}
              </div>

              <div>
                <strong>
                  Total:
                </strong>{" "}
                ₦
                {order.totalAmount?.toLocaleString() ||
                  "0"}
              </div>

              <div>
                <strong>
                  Status:
                </strong>{" "}
                {order.status || "Pending"}
              </div>

              <div>
                <strong>
                  Date:
                </strong>{" "}
                {order.createdAt
                  ? new Date(
                      order.createdAt
                    ).toLocaleDateString()
                  : "N/A"}
              </div>

            </div>

          ))

      )}

    </div>


{/* ==============================
    RECENT SERVICE REQUESTS
============================== */}

<div className="recent-orders">

  <h2>
    Recent Service Requests
  </h2>

  {loading ? (

    <p>
      Loading service requests...
    </p>

  ) : installations.length === 0 &&
    maintenance.length === 0 ? (

    <p>
      No service requests found.
    </p>

  ) : (

    [
      ...installations.map((installation) => ({
        type: "Installation",
        customer:
          installation.customer?.user?.name ||
          installation.customer?.name ||
          "Unknown",
        status:
          installation.status ||
          "Pending",
        technician:
          installation.technicians?.length
            ? installation.technicians
                .map(
                  (technician) =>
                    technician.user?.name ||
                    "Unknown"
                )
                .join(", ")
            : "Not assigned",
        date:
          installation.createdAt
      })),

      ...maintenance.map((request) => ({
        type: "Maintenance",
        customer:
          request.installation?.customer?.user?.name ||
          request.installation?.customer?.name ||
          "Unknown",
        status:
          request.status ||
          "Pending",
        technician:
          request.technician?.user?.name ||
          "Not assigned",
        date:
          request.createdAt
      }))
    ]
      .sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      )
      .slice(0, 5)
      .map((request, index) => (

        <div
          className="order-row"
          key={`${request.type}-${index}`}
        >

          <div>
            <strong>
              Type:
            </strong>{" "}
            {request.type}
          </div>

          <div>
            <strong>
              Customer:
            </strong>{" "}
            {request.customer}
          </div>

          <div>
            <strong>
              Status:
            </strong>{" "}
            {request.status}
          </div>

          <div>
            <strong>
              Technician:
            </strong>{" "}
            {request.technician}
          </div>

          <div>
            <strong>
              Date:
            </strong>{" "}
            {request.date
              ? new Date(
                  request.date
                ).toLocaleDateString()
              : "N/A"}
          </div>

        </div>

      ))

  )}

</div>

      {/* ==============================
          VIEW ALL ORDERS
      ============================== */}

      <button
        type="button"
        className="dashboard-button"
        onClick={() =>
          navigate("/auth/orders")
        }
      >
        View All Orders
      </button>

    </section>
  );
}

export default AdminDashboard;