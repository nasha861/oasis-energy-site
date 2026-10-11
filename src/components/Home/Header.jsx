import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isAdmin = role === "admin";

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  setMenuOpen(false);
  setOpenDropdown(null);

  navigate("/login");
};

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

          
          {/* CUSTOMER MAINTENANCE */}
          {token && role === "customer" && (
            <Link
              to="/auth/my-maintenance"
              onClick={closeMenu}
            >
              My Maintenance
            </Link>
          )}




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

              <Link
                to="/services/installation"
                onClick={closeMenu}
              >
                Installation
              </Link>

              <Link
                to="/services/sales"
                onClick={closeMenu}
              >
                Sales
              </Link>

              <Link
                to="/services/maintenance"
                onClick={closeMenu}
              >
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

              <Link
                to="/about/projects"
                onClick={closeMenu}
              >
                Projects
              </Link>

            </div>
          </div>


          {/* =========================
              SUPPORT
          ========================= */}

         
          <div className="dropdown support-dropdown">
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
    <Link to="/support/contact" onClick={closeMenu}>
      Contact Us
    </Link>

    <Link to="/support/blog" onClick={closeMenu}>
      Blog
    </Link>
  </div>

          </div>


          {/* =========================
              ADMIN
              ONLY VISIBLE TO ADMIN
          ========================= */}

          {isAdmin && (
            <div className="dropdown admin-dropdown">

              <button
                type="button"
                className="dropbtn"
                onClick={() => toggleDropdown("admin")}
              >
                Admin <span>▼</span>
              </button>

              <div
                className={`dropdown-content ${
                  openDropdown === "admin" ? "show" : ""
                }`}
              >

                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>

                <Link
                  to="/admin/users"
                  onClick={closeMenu}
                >
                  Users
                </Link>

                <Link
                  to="/admin/solar-products"
                  onClick={closeMenu}
                >
                  Solar Products
                </Link>

                <Link
                  to="/auth/orders"
                  onClick={closeMenu}
                >
                  Orders
                </Link>

                <Link
                  to="/admin/quotes"
                  onClick={closeMenu}
                >
                  Quotes
                </Link>

                <Link
                  to="/admin/technicians"
                  onClick={closeMenu}
                >
                  Technicians
                </Link>

                <Link
                  to="/admin/services"
                  onClick={closeMenu}
                >
                  Services
                </Link>

                <Link
                  to="/admin/service-requests"
                  onClick={closeMenu}
                >
                  Service Requests
                </Link>

              </div>
            </div>
          )}

        </div>
      </nav>


      {/* =========================
          GET STARTED
      ========================= */}

              {token ? (
          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/quote"
            className="cta-btn"
            onClick={closeMenu}
          >
            Get Started
          </Link>
        )}

    </header>
  );
}

export default Header;