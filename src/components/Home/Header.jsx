import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(
      openDropdown === dropdownName ? null : dropdownName
    );
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="header">

      {/* =========================
          LOGO
      ========================= */}

      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <img
            src="/images/Oasislogo.png"
            alt="Oasis Energy Logo"
          />
        </Link>
      </div>


      {/* =========================
          NAVIGATION
      ========================= */}

      <nav className="nav">

        {/* Mobile hamburger */}
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>


        {/* Navigation links */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>

          {/* HOME */}

          <Link to="/" onClick={closeMenu}>
            Home
          </Link>


          {/* =========================
              SERVICES
          ========================= */}

          <div className="dropdown">

            <button
              type="button"
              className="dropbtn"
              onClick={() => toggleDropdown("services")}
            >
              Services <span>▼</span>
            </button>

            <div
              className={`dropdown-content ${
                openDropdown === "services" ? "show" : ""
              }`}
            >

              <Link to="/services" onClick={closeMenu}>
                Services
              </Link>

              <Link to="/services/installation" onClick={closeMenu}>
                Installation
              </Link>

              <Link to="/services/sales" onClick={closeMenu}>
                Sales
              </Link>

              <Link to="/services/maintenance" onClick={closeMenu}>
                Maintenance
              </Link>

            </div>
          </div>


          {/* =========================
              ENERGY SOLUTIONS
          ========================= */}

          <div className="dropdown">

            <button
              type="button"
              className="dropbtn"
              onClick={() => toggleDropdown("energy")}
            >
              Energy Solutions <span>▼</span>
            </button>

            <div
              className={`dropdown-content ${
                openDropdown === "energy" ? "show" : ""
              }`}
            >

              <Link
                to="/energy-solutions"
                onClick={closeMenu}
              >
                Energy Solution
              </Link>

              <Link
                to="/energy-solutions/better-solar-panel"
                onClick={closeMenu}
              >
                Better Solar Panel
              </Link>

              <Link
                to="/energy-solutions/solar-battery-storage"
                onClick={closeMenu}
              >
                Solar Battery Storage
              </Link>

            </div>
          </div>


          {/* =========================
              ABOUT OASIS
          ========================= */}

          <div className="dropdown">

            <button
              type="button"
              className="dropbtn"
              onClick={() => toggleDropdown("about")}
            >
              About Oasis <span>▼</span>
            </button>

            <div
              className={`dropdown-content ${
                openDropdown === "about" ? "show" : ""
              }`}
            >

              <Link to="/about" onClick={closeMenu}>
                About
              </Link>

              <Link to="/about/projects" onClick={closeMenu}>
                Projects
              </Link>

            </div>
          </div>


          {/* =========================
              SUPPORT
          ========================= */}

          <div className="dropdown">

            <button
              type="button"
              className="dropbtn"
              onClick={() => toggleDropdown("support")}
            >
              Support <span>▼</span>
            </button>

            <div
              className={`dropdown-content ${
                openDropdown === "support" ? "show" : ""
              }`}
            >

              <Link to="/contact" onClick={closeMenu}>
                Contact Us
              </Link>

              <Link to="/support/blog" onClick={closeMenu}>
                Blog
              </Link>

            </div>
          </div>

        </div>
      </nav>


      {/* =========================
          GET STARTED
      ========================= */}

      <Link
        to="/contact"
        className="cta-btn"
        onClick={closeMenu}
      >
        Get Started
      </Link>

    </header>
  );
}

export default Header;