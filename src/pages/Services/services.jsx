
import { Link } from "react-router-dom";
import bgImage from "../../assets/solar--residential.png";
import "./services.css";

const services = [
  {
    title: "Solar Installation",
    description:
      "We design and install high-efficiency solar systems tailored to your needs.",
    features: [
      "Custom system design",
      "Professional installation",
      "Grid & off-grid solutions",
    ],
    button: "Get Started",
    link: "/services/installation",
  },
  {
    title: "Maintenance",
    description:
      "Ensure your system runs efficiently with regular maintenance and support.",
    features: [
      "System inspections",
      "Cleaning & repairs",
      "Performance monitoring",
    ],
    button: "Schedule Service",
    link: "/services/maintenance",
  },
  {
    title: "Solar Sales",
    description:
      "Buy premium solar equipment at competitive prices with expert advice.",
    features: [
      "Top-tier brands",
      "Affordable pricing",
      "Expert consultation",
    ],
    button: "View Products",
    link: "/auth/shop",
  },
];

function Services() {
  return (
    <>
      {/* =========================
          HERO SECTION
      ========================= */}
      <section
        className="services-hero"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="overlay">
          <h1>
            Get a Free Solar
            <br />
            Savings Estimate for
            <br />
            Home Solar Panels
          </h1>

          <Link to="/quote" className="btn">
            GET A FREE QUOTE
          </Link>
        </div>
      </section>

      {/* =========================
          SERVICES SECTION
      ========================= */}
      <section className="services">
        <h1>Our Solar Services</h1>

        <p className="subtitle">
          Powering your future with clean energy solutions
        </p>

        <div className="service-container">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <h2>{service.title}</h2>

              <p>{service.description}</p>

              <ul>
                {service.features.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <Link to={service.link} className="service-button">
                {service.button}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Services;

