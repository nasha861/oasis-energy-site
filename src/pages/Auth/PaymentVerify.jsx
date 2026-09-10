import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import api from "../../api/api";

function PaymentVerify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState(
    "Verifying your payment..."
  );

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get Paystack reference from the URL
        const reference = searchParams.get("reference");

        // Get order ID saved before redirecting to Paystack
        const orderId = localStorage.getItem("pendingOrderId");

        console.log("Paystack reference:", reference);
        console.log("Order ID:", orderId);

        if (!reference || !orderId) {
          setStatus("failed");
          setMessage(
            "Payment information is missing. We could not verify your payment."
          );
          return;
        }

        // Verify payment with our backend
        const response = await api.post(
          "/payments/paystack/verify",
          {
            reference,
            orderId,
          }
        );

        console.log(
          "Payment verification response:",
          response.data
        );

        if (response.data.success) {
          // Payment successful
          localStorage.removeItem("cart");
          localStorage.removeItem("pendingOrderId");

          setStatus("success");
          setMessage("Your payment was successful!");

          // Give the customer a moment to see success message
          setTimeout(() => {
            navigate("/auth/orders");
          }, 2000);
        } else {
          setStatus("failed");
          setMessage(
            response.data.message ||
              "Payment verification failed."
          );
        }
      } catch (error) {
        console.error(
          "Payment verification error:",
          error
        );

        setStatus("failed");
        setMessage(
          error.response?.data?.message ||
            "Unable to verify your payment."
        );
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <section
      style={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {status === "verifying" && (
          <>
            <h1>Verifying Payment...</h1>
            <p>{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <h1>Payment Successful! 🎉</h1>
            <p>{message}</p>
            <p>Redirecting to your orders...</p>
          </>
        )}

        {status === "failed" && (
          <>
            <h1>Payment Verification Failed</h1>
            <p>{message}</p>

            <button
              type="button"
              onClick={() => navigate("/auth/shop")}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Return to Shop
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default PaymentVerify;