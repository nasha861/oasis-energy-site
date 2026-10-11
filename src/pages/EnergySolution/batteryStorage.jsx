import { useEffect } from "react";
import "./batteryStorage.css";

export default function BatteryStorage() {
  useEffect(() => {
    const sections = document.querySelectorAll(
      ".battery-storage-page .battery-section"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <main className="battery-storage-page">

      {/* ===== HERO ===== */}
      <section className="battery-hero">
        <h1>Solar Battery Storage</h1>
        <p>Reliable, sustainable energy — day and night.</p>
      </section>

      {/* ===== HOME BATTERY STORAGE ===== */}
      <section id="home-battery" className="battery-section">
        <div className="battery-content">

          <div className="battery-text">
            <h2>Home Battery Storage</h2>

            <p>
              Our home battery storage systems allow you to capture excess
              solar energy during the day and use it at night or during
              outages. This means you’re less dependent on the grid and
              more in control of your energy usage.
            </p>

            <p>
              With advanced lithium-ion technology, our batteries are
              compact, safe, and built to last. They integrate seamlessly
              with your solar panels, giving you a complete energy solution
              that reduces bills and increases resilience.
            </p>
          </div>

          <div className="battery-image">
            <img
              src="/images/Industrial-Grade-Protection-IP54-Rated-3KW-Inverter-2.56kWh-Lithium-Battery-solar-installed-setup.webp"
              alt="Home battery storage system"
            />
          </div>

        </div>
      </section>

      {/* ===== ENERGY INDEPENDENCE ===== */}
      <section
        id="independence"
        className="battery-section battery-section-alt"
      >
        <div className="battery-content">

          <div className="battery-text">
            <h2>Energy Independence</h2>

            <p>
              Solar battery storage isn’t just about saving money — it’s
              about freedom. By storing your own energy, you protect
              yourself from rising utility costs and unpredictable
              outages.
            </p>

            <p>
              Imagine powering your home appliances, lights, and even
              electric vehicles with energy you generated yourself. With
              smart monitoring apps, you can track usage, optimize
              savings, and enjoy peace of mind knowing your home is
              always powered.
            </p>
          </div>

          <div className="battery-image">
            <img
              src="/images/resisdentailSolar4.png"
              alt="Family enjoying energy independence"
            />
          </div>

        </div>
      </section>

      {/* ===== WARRANTY & SUPPORT ===== */}
      <section id="warranty" className="battery-section">
        <div className="battery-content">

          <div className="battery-text">
            <h2>Warranty & Support</h2>

            <p>
              We stand behind our solar battery storage systems with
              industry-leading warranties. Each battery comes with a
              10-year performance guarantee, ensuring reliable operation
              and peace of mind.
            </p>

            <p>
              Our support team is available 24/7 to assist with
              monitoring, maintenance, and troubleshooting. With Oasis
              Energy, you’re not just buying a product — you’re investing
              in a long-term partnership for clean, dependable energy.
            </p>
          </div>

          <div className="battery-image">
            <img
              src="/images/solar-battery-storage1.webp"
              alt="Warranty and support for solar battery storage"
            />
          </div>

        </div>
      </section>

    </main>
  );
}