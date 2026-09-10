
import "./installation.css";
import { Link } from "react-router-dom";

function Installation() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="installation-hero">
        <div className="hero-content">
          <h1>Installation Services</h1>

          <p>
            Professional solar installation designed to give you reliable,
            efficient, and clean energy for your home or business.
          </p>

          <Link to="/quote" className="btn">
            Get Started Today
            </Link>
        </div>
      </section>

      {/* INSTALLATION SERVICES */}
      <section className="installation-services">
        <div className="container">
          <h2>Installation Services</h2>

          <p className="intro">
            Discover how Oasis Energy makes switching to solar simple,
            seamless, and stress-free.
          </p>

          <div className="steps">
            {/* STEP 1 */}
            <div className="step">
              <span className="icon">🏠</span>

              <h3>Site Assessment</h3>

              <p>
                We evaluate your home's roof, energy needs, and location to
                design the perfect solar solution.
              </p>
            </div>

            {/* STEP 2 */}
            <div className="step">
              <span className="icon">🛠️</span>

              <h3>Customized System Design</h3>

              <p>
                Tailored layouts and battery options that maximize efficiency
                and fit your lifestyle.
              </p>
            </div>

            {/* STEP 3 */}
            <div className="step">
              <span className="icon">📑</span>

              <h3>Permits & Approvals</h3>

              <p>
                We handle local regulations, utility approvals, and government
                paperwork for you.
              </p>
            </div>

            {/* STEP 4 */}
            <div className="step">
              <span className="icon">⚡</span>

              <h3>Professional Installation</h3>

              <p>
                Certified technicians install panels and batteries with
                precision, safety, and style.
              </p>
            </div>

            {/* STEP 5 */}
            <div className="step">
              <span className="icon">✅</span>

              <h3>System Testing</h3>

              <p>
                Comprehensive checks ensure your system is fully functional
                and ready to deliver clean energy.
              </p>
            </div>

            {/* STEP 6 */}
            <div className="step">
              <span className="icon">📱</span>

              <h3>Customer Training</h3>

              <p>
                We guide you through monitoring tools and apps so you can
                track and optimize your energy use.
              </p>
            </div>

            {/* STEP 7 */}
            <div className="step">
              <span className="icon">🔧</span>

              <h3>After-Sales Support</h3>

              <p>
                Enjoy ongoing maintenance, warranties, and support for peace
                of mind.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="cta">
           <Link to="/quote" className="btn">
            Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Installation;
