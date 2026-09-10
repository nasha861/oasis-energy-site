
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import shoppingImage from "../../assets/shopping.webp";
import api from "../../api/api";

import "./checkout.css";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
  fullName: "",
  email: "",
  phone: "",
  deliveryAddress: "",
});

const [paymentMethod, setPaymentMethod] = useState("");

  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Handle customer information
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate total
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Place order
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  if (!paymentMethod) {
    alert("Please select a payment method.");
    return;
  }

  try {
    setLoading(true);

    // Convert cart into the structure expected by Order.js
    const orderItems = cart.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    }));

    const orderData = {
      items: orderItems,
      totalAmount,
      customerInfo,
      paymentMethod,
    };

    console.log("Sending order:", orderData);

    // 1. Create the order
    const response = await api.post("/orders", orderData);

    console.log("Order created:", response.data);

    const orderId = response.data.data._id;

    console.log("Order ID:", orderId);

    localStorage.setItem("pendingOrderId", orderId);

    // 2. If Card is selected, initialize Paystack
    if (paymentMethod === "Card") {
      const paymentResponse = await api.post(
        "/payments/paystack/initialize",
        {
          orderId,
        }
      );

      console.log(
        "Paystack initialized:",
        paymentResponse.data
      );

      const authorizationUrl =
        paymentResponse.data.data.authorization_url;

      // Make sure Paystack gave us a checkout URL
      if (!authorizationUrl) {
        throw new Error(
          "Paystack did not return a payment URL."
        );
      }

      // Redirect customer to Paystack checkout
      window.location.href = authorizationUrl;

      return;
    }

    // 3. For non-Card payment methods
    const paymentResponse = await api.post("/payments", {
      orderId,
      paymentMethod,
    });

    console.log("Payment created:", paymentResponse.data);

    // Clear cart only after order and payment are successful
    localStorage.removeItem("cart");
    setCart([]);

    alert("Order placed successfully!");

    navigate("/auth/shop");
  } catch (error) {
    console.error("Checkout error:", error);

    alert(
      error.response?.data?.message ||
        error.message ||
        "Failed to place order. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

        return (
    <>
      {/* Checkout Hero */}
      <section
        className="checkout-hero"
        style={{ backgroundImage: `url(${shoppingImage})` }}
      >
        <h1>Checkout</h1>
        <p>Review your products and place your order.</p>
      </section>

      {/* Cart Section */}
      <section className="checkout-section">
        <div className="checkout-container">
          <h2>Your Cart</h2>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>

              <button
                type="button"
                className="cta-btn"
                onClick={() => navigate("/auth/shop")}
              >
                Return to Shop
              </button>
            </div>
          ) : (
            <>
              <ul className="checkout-cart">
                {cart.map((item, index) => (
                  <li key={`${item.id}-${index}`}>
                    <img src={item.image} alt={item.name} />

                    <div className="cart-item-info">
                      <h3>{item.name}</h3>

                      <p>{item.description}</p>

                      <p>
                        Price: ₦{item.price.toLocaleString()}
                      </p>

                      <p>
                        Quantity: {item.quantity}
                      </p>

                      <p>
                        Subtotal: ₦
                        {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="checkout-total">
                <h2>
                  Total: ₦{totalAmount.toLocaleString()}
                </h2>
              </div>

              {/* Customer Information */}
              <form
                className="checkout-form"
                onSubmit={handleSubmit}
              >
                <h2>Customer Information</h2>

                <div className="form-group">
                  <label htmlFor="name">Full Name</label>

                  <input
                    type="text"
                    id="name"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={customerInfo.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={customerInfo.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={customerInfo.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">
                    Delivery Address
                  </label>

                  <textarea
                    id="address"
                    name="deliveryAddress"
                    placeholder="Enter your delivery address"
                    rows="4"
                    value={customerInfo.deliveryAddress}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                    <label htmlFor="paymentMethod">
                        Payment Method
                    </label>

                    <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    >
                        <option value="">Select payment method</option>
                        <option value="Card">Card</option>
                        <option value="Transfer">Bank Transfer</option>
                        <option value="Cash">Cash</option>
                        <option value="Wallet">Wallet</option>
                    </select>
                </div>

                <button
                  type="submit"
                  className="cta-btn"
                  disabled={loading}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Checkout;
