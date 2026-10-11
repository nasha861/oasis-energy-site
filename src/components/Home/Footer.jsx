
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-left">
          <h3>OASIS ENERGY</h3>

          <p>(+234 808 3887 719)</p>
          <p>Plot 207 Garki, Abuja</p>

          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>

            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>

            <a href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>

            <a href="#" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>

            <a href="#" aria-label="X">
              <i className="fab fa-x-twitter"></i>
            </a>
          </div>
        </div>


        <div className="footer-links">

          {/* =========================
              SOLAR SOLUTIONS
          ========================= */}

          <div>
            <h4>Solar Solutions</h4>

            <ul>
              <li>
                <Link to="/energy-solutions">
                  Home Solar Systems
                </Link>
              </li>

              <li>
                <Link to="/energy-solutions/solar-battery-storage">
                  Home Battery Storage
                </Link>
              </li>

              <li>
                <Link to="/energy-solutions">
                  How Solar Works
                </Link>
              </li>

              <li>
                <Link to="/services/installation">
                  Installation Process
                </Link>
              </li>

              <li>
                <a href="#">
                  Warranty
                </a>
              </li>
            </ul>
          </div>


          {/* =========================
              OUR COMPANY
          ========================= */}

          <div>
            <h4>Our Company</h4>

            <ul>
              <li>
                <Link to="/about">
                  About
                </Link>
              </li>

              <li>
                <Link to="/support/contact">
                  Contact
                </Link>
              </li>

              <li>
                <Link to="/support/blog">
                  Blog
                </Link>
              </li>

              <li>
                <a href="#">
                  Our Service Areas
                </a>
              </li>
            </ul>
          </div>


          {/* =========================
              OASIS ENERGY
          ========================= */}

          <div>
            <h4>OASIS ENERGY</h4>

            <ul>
              <li>
                <a href="#">
                  Leadership
                </a>
              </li>

              <li>
                <a href="#">
                  Newsroom
                </a>
              </li>

              <li>
                <a href="#">
                  Licenses
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>


      {/* =========================
          FOOTER BOTTOM
      ========================= */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Oasis. All rights reserved.
        </p>

        <Link to="/quote" className="cta-btn">
          Start your Quote
        </Link>

      </div>

    </footer>
  );
}

