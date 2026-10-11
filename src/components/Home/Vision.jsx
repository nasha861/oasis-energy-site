
import { Link } from "react-router-dom";
import homepageImage from "../../assets/Homepage.webp";
export default function Vision() {
  return (
    <section className="vision-section">
      <div className="vision-image">
        <img
          src={homepageImage}
          alt="House with solar energy"
        />
      </div>
      <div className="vision-text">
        <Link to="/about" className="cta-btn">
          Our Vision
        </Link>
        <p>
          “To transform every home and business into a self-sustaining
          oasis of power, eliminating the uncertainty of the grid and
          fueling Nigeria’s future with clean, limitless energy.”
        </p>
      </div>
    </section>
  );
}
