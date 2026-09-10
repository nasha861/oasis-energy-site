import { useEffect, useState } from "react";
import api from "../../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders");

        console.log("Orders from backend:", response.data);

        setOrders(response.data.data);
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
          ? { ...order, status: newStatus }
          : order
      )
    );

    alert("Order status updated successfully!");
  } catch (error) {
    console.error("Update order status error:", error);

    alert(
      error.response?.data?.message ||
        "Failed to update order status."
    );
  }
};

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h1>Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id}>
            <h2>Order ID: {order._id}</h2>

            <h3>Products</h3>

            {order.items.map((item, index) => (
              <div key={index}>
                <p>
                  <strong>Product:</strong> {item.name}
                </p>

                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>

                <p>
                  <strong>Price:</strong> ₦
                  {item.price.toLocaleString()}
                </p>

                <p>
                  <strong>Subtotal:</strong> ₦
                  {item.subtotal.toLocaleString()}
                </p>
              </div>
            ))}

            <p>
              <strong>Total:</strong> ₦
              {order.totalAmount.toLocaleString()}
            </p>

                      <div>
              <strong>Status:</strong>

              <select
                value={order.status}
                onChange={(e) =>
                  handleStatusChange(order._id, e.target.value)
                }
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <p>
              <strong>Payment Status:</strong>{" "}
              {order.paymentStatus}
            </p>

            <hr />
          </div>
        ))
      )}
    </section>
  );
}

export default Orders;