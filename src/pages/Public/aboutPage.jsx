import Header from "../../components/Home/Header";
import Footer from "../../components/Home/Footer";
import bgImage from "../../assets/residentailSolar1.png";
import "./about.css";


export default function AboutPage() {
  return (
   <>

      {/* ================= INTRO ================= */}
      <section
      className="about-hero"
      style={{ backgroundImage: `url(${bgImage})` }}>
    
        <div className="overlay">
          <h1>About Oasis Energy</h1>
          <p>
            Oasis Energy is committed to delivering clean, reliable, and
            affordable solar solutions for homes and businesses across Nigeria.
          </p>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="mission-vision">
        <div className="mv-container">
          <div className="mv-box">
            <h2>Our Mission</h2>
            <p>
              To provide sustainable and cost-effective solar energy solutions
              that empower individuals and businesses to reduce energy costs and
              environmental impact.
            </p>
          </div>

          <div className="mv-box">
            <h2>Our Vision</h2>
            <p>
              To become a leading renewable energy provider in Africa, driving
              innovation and making solar energy accessible to all.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="why-us">
        <h2>Why Choose Us</h2>

        <div className="why-container">
          <div className="why-card">
            <h3>⚡ Reliable Energy</h3>
            <p>We provide consistent and uninterrupted solar power solutions.</p>
          </div>

          <div className="why-card">
            <h3>💰 Cost Savings</h3>
            <p>Reduce electricity bills and enjoy long-term savings.</p>
          </div>

          <div className="why-card">
            <h3>🌍 Eco-Friendly</h3>
            <p>Clean energy that protects the environment.</p>
          </div>

          <div className="why-card">
            <h3>🔧 Expert Installation</h3>
            <p>Professional and efficient solar system installation.</p>
          </div>
        </div>
      </section>

      
    </>
  );
}
