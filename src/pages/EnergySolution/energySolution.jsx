
import { Link } from "react-router-dom";

import "./energySolution.css";

export default function EnergySolution() {
  return (
    <main className="energy-solution-page">

      {/* ===== HERO SECTION ===== */}
      <section className="energy-hero">
        <div className="energy-hero-left">
          <img
            src="/images/SolarRing.png"
            alt="Oasis Energy Solar Ring"
          />

          <div className="energy-hero-content">
            <h1>
              OASIS ENERGY.
              <br />
              Your Source for Uninterrupted Power
            </h1>

            <p>
              Panels, Batteries and Installation for Home & Business.
            </p>

            <Link to="/quote" className="btn">
              GET A FREE QUOTE
            </Link>
          </div>
        </div>
      </section>


      {/* ===== INTRODUCTION ===== */}
      <section className="energy-intro">
        <h1>Energy Solution</h1>

        <p>
          Discover Oasis Energy’s advanced solar panels designed for
          maximum efficiency and durability.
        </p>
      </section>


      {/* ===== HOME SOLAR ===== */}
      <section className="promo solar">
        <div className="promo-text">
          <h2>Reliable Home Solar that just Works</h2>

          <p>
            Forget the stress of power cuts. We build sleek,
            high-performance solar systems using only the best tech
            and toughest components. Get clean, reliable energy that
            fits your lifestyle and looks great on your roof.
          </p>
        </div>

        <div className="promo-image">
          <img
            src="/images/Choosing-the-Right-Solar-Panel-System-Size.jpg"
            alt="House with solar panels"
          />
        </div>
      </section>


      {/* ===== BATTERY STORAGE ===== */}
      <section className="promo battery">
        <div className="promo-text">
          <h2>Take Control of Your Solar Energy Use</h2>

          <p>
            Maximize your solar investment by storing every bit of
            extra power for when you need it most. Our smart battery
            solutions allow you to run your home on clean energy
            through the night, slashing costs and keeping your
            essential systems running during every grid outage.
            It’s more than just backup power; it’s the peace of mind
            that comes with true energy independence and a home that
            never goes dark.
          </p>
        </div>

        <div className="promo-image">
          <img
            src="/images/bat-img4.jpg"
            alt="Battery storage system"
          />
        </div>
      </section>

    </main>
  );
}

