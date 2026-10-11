
import { Link } from "react-router-dom";

import "./betterSolarPanel.css";

export default function BetterSolarPanel() {
  return (
    <main className="better-solar-page">

      {/* ===== HERO SECTION ===== */}
      <section className="better-solar-hero">
        <div className="better-solar-hero-left">
          <img
            src="/images/installer1.webp"
            alt="Technicians installing solar panels"
          />

          <div className="better-solar-hero-content">
            <h1>Better Solar Panels</h1>

            <p>
              Clean, reliable energy for your home and future.
            </p>

            <Link to="/quote" className="better-solar-btn">
              GET A FREE QUOTE
            </Link>
          </div>
        </div>
      </section>


      {/* ===== HOME SOLAR SYSTEM ===== */}
      <section id="home" className="better-section">
        <div className="better-content">

          <div className="better-text">
            <h2>Home Solar System</h2>

            <p>
              Our home solar systems are designed to transform the way
              you power your life. By harnessing the sun’s energy, you
              gain independence from rising utility costs and unreliable
              grids. Each system is tailored to your household’s energy
              needs, ensuring maximum efficiency and savings.
            </p>

            <p>
              With sleek rooftop panels, smart inverters, and optional
              battery storage, your home becomes a hub of clean energy.
              Imagine running appliances, lights, and even electric
              vehicles on power generated right above your head. Beyond
              savings, you’re contributing to a greener planet and
              reducing your carbon footprint.
            </p>
          </div>

          <div className="better-image">
            <img
              src="/images/Single-family-house-with-solar-panels-installed-on-a-sloped-roof.webp"
              alt="House with solar panels"
            />

            <img
              src="/images/Battery-storage-AC-how-it-works-1435x800.jpg"
              alt="Battery storage for solar energy"
            />
          </div>

        </div>
      </section>


      {/* ===== HOW SOLAR WORKS ===== */}
      <section id="how" className="better-section better-section-alt">
        <div className="better-content">

          <div className="better-text">
            <h2>How Solar Works</h2>

            <p>
              Solar panels capture sunlight and convert it into direct
              current (DC) electricity. This electricity flows into an
              inverter, which transforms it into alternating current
              (AC) — the type of power your home uses every day.
            </p>

            <p>
              During the day, your solar system powers your home
              directly. Any excess energy can be stored in batteries
              for nighttime use or sent back to the grid, often earning
              you credits through net metering. This means you’re not
              just saving money — you’re potentially earning it.
            </p>

            <p>
              Solar technology is simple yet powerful: no moving parts,
              minimal maintenance, and a lifespan of 25+ years. It’s a
              proven solution that turns free sunlight into reliable
              electricity, day after day.
            </p>
          </div>

          <div className="better-image">
            <img
              src="/images/solar-Radition.png"
              alt="Diagram showing how solar works"
            />
          </div>

        </div>
      </section>


      {/* ===== INSTALLATION PROCESS ===== */}
      <section id="install" className="better-section">
        <div className="better-content">

          <div className="better-text">
            <h2>Installation Process</h2>

            <p>
              Switching to solar with Better Solar Panels is a seamless
              journey. We handle everything from start to finish, so
              you can focus on enjoying the benefits.
            </p>

            <ol>
              <li>
                <strong>Site Assessment:</strong> Our experts evaluate
                your roof, energy usage, and location to design the
                perfect system.
              </li>

              <li>
                <strong>System Design:</strong> We create a customized
                plan that balances aesthetics, efficiency, and budget.
              </li>

              <li>
                <strong>Permits & Approvals:</strong> All paperwork with
                local authorities and utilities is managed by us.
              </li>

              <li>
                <strong>Professional Installation:</strong> Certified
                technicians install panels, inverters, and batteries
                with precision and care.
              </li>

              <li>
                <strong>System Testing:</strong> We run thorough checks
                to ensure everything operates at peak performance.
              </li>

              <li>
                <strong>Customer Training:</strong> You’ll learn how to
                monitor your system and maximize savings using apps and
                dashboards.
              </li>

              <li>
                <strong>Ongoing Support:</strong> With warranties and
                24/7 support, you’re never left in the dark.
              </li>
            </ol>
          </div>

          <div className="better-image">
            <img
              src="/images/commercial-solar-installation-process-infographic.jpg"
              alt="Technicians installing solar panels"
            />
          </div>

        </div>
      </section>

    </main>
  );
}

