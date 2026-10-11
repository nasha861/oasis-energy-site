import { Link } from "react-router-dom";
import residentialSolar from "../../assets/solar--residential.png";
import residentialHome from "../../assets/Resisdential-solar-home.jpg";
import hybridSolar from "../../assets/HybridSolarSystem.jpg";
export default function Panels() {
  return (
    <section className="panels">
      <div className="panel">
        <img src={residentialSolar} alt="New Homes" />
        <h3>Residential Solutions</h3>
        <p>
          Efficient solar panels designed for modern homes.
        </p>
        <Link to="/energy-solutions" className="cta-btn">
          Explore
        </Link>
      </div>
      <div className="panel">
        <img
          src={residentialHome}
          alt="Residential Solar Systems"
        />
        <h3>Commercial Systems</h3>
        <p>
          Scalable energy solutions for businesses and industries.
        </p>
        <Link to="/services/sales" className="cta-btn">
          Explore
        </Link>
      </div>
      <div className="panel">
        <img src={hybridSolar} alt="Solar Battery Storage" />
        <h3>Off-Grid Energy</h3>
        <p>
          Reliable solar systems for remote and rural areas.
        </p>

        <Link
          to="/energy-solutions/solar-battery-storage"
          className="cta-btn"
        >
          Explore
        </Link>
      </div>
    </section>
  );
}
