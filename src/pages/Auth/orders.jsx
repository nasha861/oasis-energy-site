import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [viewingOrder, setViewingOrder] = useState(null);

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders");

        console.log("Orders from backend:", response.data);

        setOrders(response.data.data || []);
      } catch (error) {
        console.error("Fetch orders error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await api.put(`/orders/${orderId}`, {
        status: newStatus,
      });

      console.log("Updated order:", response.data);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: newStatus,
              }
            : order
        )
      );

      if (viewingOrder?._id === orderId) {
        setViewingOrder((currentOrder) => ({
          ...currentOrder,
          status: newStatus,
        }));
      }

      alert("Order status updated successfully!");
    } catch (error) {
      console.error("Update order status error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update order status."
      );
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await api.delete(`/orders/${orderId}`);

      console.log("Deleted order:", response.data);

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );

      if (viewingOrder?._id === orderId) {
        setViewingOrder(null);
      }

      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Delete order error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete order."
      );
    }
  };

  const handleViewOrder = (order) => {
    setViewingOrder(order);
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="orders-page">
      <h1>Orders</h1>

        {role !== "admin" && (
          <div className="order-actions">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={() => navigate("/auth/shop")}
            >
              Continue Shopping
            </button>
          </div>
        )}

      <p>
        {role === "admin"
          ? "Manage customer orders and order status."
          : "View your orders and payment status."}
      </p>

      {/* =========================
          ORDER DETAILS
      ========================== */}
      {viewingOrder && (
        <div className="order-card">
          <h2>Order Details</h2>

          <p>
            <strong>Order ID:</strong>{" "}
            {viewingOrder._id}
          </p>

          {role === "admin" && (
            <>
              <p>
                <strong>Customer:</strong>{" "}
                {viewingOrder.userId?.name ||
                  viewingOrder.customerInfo?.fullName ||
                  "Unknown"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {viewingOrder.userId?.email ||
                  viewingOrder.customerInfo?.email ||
                  "Unknown"}
              </p>
            </>
          )}

          <p>
            <strong>Phone:</strong>{" "}
            {viewingOrder.customerInfo?.phone || "N/A"}
          </p>

          <p>
            <strong>Delivery Address:</strong>{" "}
            {viewingOrder.customerInfo?.deliveryAddress ||
              "N/A"}
          </p>

          <h3 className="order-items">
            Products
          </h3>

          {viewingOrder.items?.map((item, index) => (
            <div
              className="order-item"
              key={index}
            >
              <p>
                <strong>Product:</strong>{" "}
                {item.name}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {item.quantity}
              </p>

              <p>
                <strong>Price:</strong> ₦
                {Number(item.price || 0).toLocaleString()}
              </p>

              <p>
                <strong>Subtotal:</strong> ₦
                {Number(item.subtotal || 0).toLocaleString()}
              </p>
            </div>
          ))}

          <p>
            <strong>Total:</strong> ₦
            {Number(
              viewingOrder.totalAmount || 0
            ).toLocaleString()}
          </p>

          <p>
            <strong>Payment Status:</strong>{" "}
            {viewingOrder.paymentStatus || "N/A"}
          </p>

          <p>
            <strong>Payment Method:</strong>{" "}
            {viewingOrder.paymentMethod || "N/A"}
          </p>

          <p>
            <strong>Transaction ID:</strong>{" "}
            {viewingOrder.transactionId || "N/A"}
          </p>

          <p>
            <strong>Order Status:</strong>{" "}
            {viewingOrder.status || "N/A"}
          </p>

          <div className="order-actions">
            <button
              type="button"
              onClick={() => setViewingOrder(null)}
            >
              Close
            </button>

            {role !== "admin" && (
              <>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to Dashboard
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/auth/shop")}
                >
                  Continue Shopping
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* =========================
          ORDERS LIST
      ========================== */}

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            className="order-card"
            key={order._id}
          >
            <p>
              <strong>Order ID:</strong>{" "}
              {order._id}
            </p>

            {role === "admin" && (
              <>
                <p>
                  <strong>Customer:</strong>{" "}
                  {order.userId?.name ||
                    order.customerInfo?.fullName ||
                    "Unknown"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {order.userId?.email ||
                    order.customerInfo?.email ||
                    "Unknown"}
                </p>
              </>
            )}

            <h3 className="order-items">
              Products
            </h3>

            {order.items?.map((item, index) => (
              <div
                className="order-item"
                key={index}
              >
                <p>
                  <strong>Product:</strong>{" "}
                  {item.name}
                </p>

                <p>
                  <strong>Quantity:</strong>{" "}
                  {item.quantity}
                </p>

                <p>
                  <strong>Price:</strong> ₦
                  {Number(
                    item.price || 0
                  ).toLocaleString()}
                </p>

                <p>
                  <strong>Subtotal:</strong> ₦
                  {Number(
                    item.subtotal || 0
                  ).toLocaleString()}
                </p>
              </div>
            ))}

            <p>
              <strong>Total:</strong> ₦
              {Number(
                order.totalAmount || 0
              ).toLocaleString()}
            </p>

            <div>
              <strong>Status:</strong>{" "}

              {role === "admin" ? (
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order._id,
                      e.target.value
                    )
                  }
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Confirmed">
                    Confirmed
                  </option>

                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>
              ) : (
                <span>{order.status}</span>
              )}
            </div>

            <p>
              <strong>Payment Status:</strong>{" "}
              {order.paymentStatus}
            </p>

            {/* ADMIN ACTIONS */}
                {role === "admin" ? (
            <div className="order-actions">
              <button
                type="button"
                onClick={() =>
                  handleViewOrder(order)
                }
              >
                View
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDeleteOrder(order._id)
                }
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="order-actions">
              <button
                type="button"
                onClick={() =>
                  handleViewOrder(order)
                }
              >
                View Details
              </button>
            </div>
          )}

            <hr />
          </div>
        ))
      )}
    </section>
  );
}

export default Orders;