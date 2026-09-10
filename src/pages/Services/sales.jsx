import { Link } from "react-router-dom";
import "./sales.css";

import salesRep from "../../assets/salesRep.png";
import battery10kwh from "../../assets/10kwh.webp";
import battery20kwh from "../../assets/20kwh.jpg";
import solarPanel400w from "../../assets/400WSolarPanel.webp";
import solarInverter5kw from "../../assets/5kWSolarInverter.webp";
import hybridSolarSystem from "../../assets/HybridSolarSystem.jpg";
import portableSolarGenerator from "../../assets/PortableSolarGenerator.webp";

function Sales() {
  return (
    <main className="sales-page">

      {/* ================= HERO SECTION ================= */}
      <section
        className="sales-hero"
        style={{ backgroundImage: `url(${salesRep})` }}
      >
        <div className="sales-hero-overlay"></div>

        <div className="sales-hero-content">
          <h1>Our Solar Products</h1>

          <p>
            Reliable, sustainable energy solutions for every need.
          </p>

          <Link to="/auth/shop" className="sales-cta-btn">
            Shop Now
          </Link>
        </div>
      </section>


      {/* ================= PRODUCT 1 ================= */}
      <section id="product1" className="sales-section">
        <div className="sales-content">

          <div className="sales-text">
            <h2>Solar Battery Storage 10kWh</h2>

            <p>
              This compact battery stores excess solar energy for use
              at night or during outages. Ideal for small households.
            </p>

            <p>
              <strong>Specifications:</strong> 10kWh capacity,
              lithium-ion, 10-year warranty.
            </p>

            <p>
              Designed for durability and safety, with surge
              protection and smart monitoring.
            </p>
          </div>

          <div className="sales-image">
            <img
              src={battery10kwh}
              alt="10kWh Solar Battery"
            />
          </div>

        </div>
      </section>


      {/* ================= PRODUCT 2 ================= */}
      <section id="product2" className="sales-section sales-section-alt">
        <div className="sales-content">

          <div className="sales-text">
            <h2>Solar Battery Storage 20kWh</h2>

            <p>
              Perfect for larger homes or small businesses,
              offering extended backup power.
            </p>

            <p>
              <strong>Specifications:</strong> 20kWh capacity,
              scalable, advanced thermal management.
            </p>

            <p>
              Includes mobile app integration for real-time
              monitoring and optimization.
            </p>
          </div>

          <div className="sales-image">
            <img
              src={battery20kwh}
              alt="20kWh Solar Battery"
            />
          </div>

        </div>
      </section>


      {/* ================= PRODUCT 3 ================= */}
      <section id="product3" className="sales-section">
        <div className="sales-content">

          <div className="sales-text">
            <h2>Solar Panel 400W</h2>

            <p>
              High-efficiency solar panel designed to maximize
              energy capture even in low-light conditions.
            </p>

            <p>
              <strong>Specifications:</strong> 400W output,
              monocrystalline, 25-year performance warranty.
            </p>

            <p>
              Lightweight, durable, and easy to install on
              rooftops or ground mounts.
            </p>
          </div>

          <div className="sales-image">
            <img
              src={solarPanel400w}
              alt="400W Solar Panel"
            />
          </div>

        </div>
      </section>


      {/* ================= PRODUCT 4 ================= */}
      <section id="product4" className="sales-section sales-section-alt">
        <div className="sales-content">

          <div className="sales-text">
            <h2>Solar Inverter 5kW</h2>

            <p>
              Converts solar energy into usable electricity
              with high efficiency and reliability.
            </p>

            <p>
              <strong>Specifications:</strong> 5kW output,
              grid-tied, smart monitoring.
            </p>

            <p>
              Compact design with advanced cooling system
              for long-lasting performance.
            </p>
          </div>

          <div className="sales-image">
            <img
              src={solarInverter5kw}
              alt="5kW Solar Inverter"
            />
          </div>

        </div>
      </section>


      {/* ================= PRODUCT 5 ================= */}
      <section id="product5" className="sales-section">
        <div className="sales-content">

          <div className="sales-text">
            <h2>Hybrid Solar System</h2>

            <p>
              A complete package combining panels, batteries,
              and inverter for total energy independence.
            </p>

            <p>
              <strong>Specifications:</strong> 5kW panels +
              20kWh battery + inverter.
            </p>

            <p>
              Provides seamless transition between solar and
              grid power, ensuring reliability.
            </p>
          </div>

          <div className="sales-image">
            <img
              src={hybridSolarSystem}
              alt="Hybrid Solar System"
            />
          </div>

        </div>
      </section>


      {/* ================= PRODUCT 6 ================= */}
      <section id="product6" className="sales-section sales-section-alt">
        <div className="sales-content">

          <div className="sales-text">
            <h2>Portable Solar Generator</h2>

            <p>
              Compact and mobile solution for camping,
              outdoor events, or emergency backup.
            </p>

            <p>
              <strong>Specifications:</strong> 2kWh capacity,
              USB/AC outputs, lightweight design.
            </p>

            <p>
              Rechargeable via solar panels or grid,
              perfect for off-grid adventures.
            </p>
          </div>

          <div className="sales-image">
            <img
              src={portableSolarGenerator}
              alt="Portable Solar Generator"
            />
          </div>

        </div>
      </section>


      {/* ================= PURCHASE CTA ================= */}
      <section id="purchase" className="sales-purchase">
        <div className="sales-purchase-content">

          <h2>Ready to Power Your Future?</h2>

          <p>
            Choose the product that fits your needs and enjoy
            reliable, sustainable energy today.
          </p>

          <Link to="/auth/shop" className="sales-cta-btn">
            Purchase Now
          </Link>

        </div>
      </section>

    </main>
  );
}

export default Sales;