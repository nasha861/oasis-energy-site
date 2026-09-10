
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import shoppingImage from "../../assets/shopping.webp";
import battery10 from "../../assets/10kwh.webp";
import battery20 from "../../assets/20kwh.jpg";
import solarPanel from "../../assets/400WSolarPanel.webp";
import inverter from "../../assets/5kWSolarInverter.webp";
import hybridSystem from "../../assets/HybridSolarSystem.jpg";
import portableGenerator from "../../assets/PortableSolarGenerator.webp";

import api from "../../api/api";

import "./shop.css";

function Shop() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await api.get("/solar-products");

        console.log("Products from backend:", response.data);

        setProducts(response.data.data);
      } catch (error) {
        console.error("Fetch products error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Load existing cart
  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  // Get image for each product
  const getProductImage = (product) => {
    if (product.name === "Solar Battery 10kWh") {
      return battery10;
    }

    if (product.name === "Bas Sun Solar") {
      return solarPanel;
    }

    if (product.name === "Solar Panel X") {
      return solarPanel;
    }

    return solarPanel;
  };

  // Add product to cart
  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.id === product._id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          id: product._id,
          name: product.name,
          description: product.description,
          image: getProductImage(product),
          price: product.price,
          quantity: 1,
        },
      ];
    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert(`${product.name} added to cart!`);
  }

  // Update cart quantity
  const updateQuantity = (productId, change) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: item.quantity + change,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  return (
    <main className="shop-page">

      {/* ================= HERO ================= */}
      <section
        className="shop-hero"
        style={{
          backgroundImage: `url(${shoppingImage})`,
        }}
      >
        <div className="shop-hero-overlay"></div>

        <div className="shop-hero-content">
          <h1>Shop Oasis Energy Products</h1>

          <p>
            Choose the perfect solar solution for your needs.
          </p>
        </div>
      </section>

      {/* ================= SHOP NAVIGATION ================= */}
      <nav className="sticky-navbar">
        <ul>

          <li>
            <Link to="/services/sales">
              Sales Page
            </Link>
          </li>

          <li className="cart-icon">
            <Link to="/auth/checkout">
              🛒
              <span>{cart.length}</span>
            </Link>
          </li>

        </ul>
      </nav>

      {/* ================= PRODUCTS ================= */}
      <section className="products">

        {loading && (
          <p>Loading products...</p>
        )}

        {error && (
          <p>{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p>No products available.</p>
        )}

        {!loading &&
          !error &&
          products.map((product) => (
            <div
              className="product-card"
              key={product._id}
            >

              <img
                src={getProductImage(product)}
                alt={product.name}
              />

              <h2>{product.name}</h2>

              <p>{product.description}</p>

              <p className="product-price">
                ₦{product.price.toLocaleString()}
              </p>

              <button
                type="button"
                className="cta-btn add-to-cart"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>

            </div>
          ))}

      </section>

      {/* ================= CART ================= */}
      <section className="cart-section">

        <div className="cart-content">

          <h2>Your Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is currently empty.</p>
          ) : (
            <ul className="cart-items">

              {cart.map((item) => (
                <li key={item.id}>

                  <div className="cart-item-info">

                    <h3>{item.name}</h3>

                    <p>
                      Price: ₦
                      {item.price.toLocaleString()}
                    </p>

                    <div className="quantity-controls">

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, -1)
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, 1)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                </li>
              ))}

            </ul>
          )}

          <Link
            to="/auth/checkout"
            className="cta-btn"
          >
            Proceed to Checkout
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Shop;
