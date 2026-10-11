
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

import Header from "../../components/Home/Header";
import Footer from "../../components/Home/Footer";

import "./Maintenance.css";

function Maintenance() {
   const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
const [activeDropdown, setActiveDropdown] = useState(null);
const [showModal, setShowModal] = useState(false);

const [formData, setFormData] = useState({
  installation: "6aa86d71cdf922724b37e5d6",
  package: "",
  type: "",
  description: ""
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};


const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Maintenance form submitted!");
  setError("");
  setLoading(true);

  try {
    const response = await api.post("/maintenance", formData);

    console.log("Maintenance request created:", response.data);

    setShowModal(true);
    alert("Maintenance request submitted successfully!");

    setFormData({
      installation: "6aa86d71cdf922724b37e5d6",
      package: "",
      type: "",
      description: ""
    });
  } catch (error) {
    console.error("Maintenance request error:", error);

    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to submit maintenance request.";

    setError(message);
    alert("Submission failed: " + message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="maintenance-page">

      {/* ===== HERO ===== */}
      <section className="hero">
        <h1>Solar Maintenance Services</h1>
        <p>
          Ensuring your solar systems run at peak performance, every day.
        </p>
      </section>

      {/* ===== INTRO ===== */}
      <section id="intro" className="section">
        <div className="content">

          <div className="text">
            <h2>Why Maintenance Matters</h2>

            <p>
              Solar systems are long-term investments, and like any
              technology, they require regular care to deliver optimal
              performance. At Oasis Solar, we provide comprehensive
              maintenance services that protect your panels, batteries,
              and inverters from wear and tear. Our team ensures that
              your system continues to generate maximum energy output,
              saving you money and reducing your carbon footprint.
              Proper maintenance also extends the lifespan of your
              equipment, preventing costly breakdowns and ensuring safety.
              With our proactive approach, you can enjoy uninterrupted
              clean energy while we handle the technical details. We
              believe maintenance is not just about fixing problems,
              but about preventing them before they occur.
            </p>
          </div>

          <div className="image">
            <img
              src="/images/maintenance.jpg"
              alt="Solar maintenance overview"
            />
          </div>

        </div>
      </section>

      {/* ===== ROUTINE INSPECTIONS ===== */}
      <section id="routine" className="section alt">
        <div className="content">

          <div className="text">
            <h2>Routine Inspections</h2>

            <p>
              Routine inspections are the backbone of solar system
              maintenance. Our technicians conduct scheduled visits
              to clean panels, check wiring connections, and assess
              inverter and battery health. Dust, debris, and weather
              conditions can reduce panel efficiency, so regular
              cleaning is essential. We also test voltage levels,
              monitor energy output, and ensure all safety mechanisms
              are functioning correctly. These inspections help
              identify minor issues before they escalate into major
              problems. By keeping your system in top condition, we
              guarantee consistent energy production and peace of mind.
              Our inspection reports provide transparency, giving you
              a clear picture of your system’s health and performance.
            </p>
          </div>

          <div className="image">
            <img
              src="/images/inspection-maintenance.jpg"
              alt="Technician inspecting solar panels"
            />
          </div>

        </div>
      </section>

      {/* ===== PERFORMANCE OPTIMIZATION ===== */}
      <section id="optimization" className="section">
        <div className="content">

          <div className="text">
            <h2>Performance Optimization</h2>

            <p>
              Even well-installed solar systems can lose efficiency
              over time. Our performance optimization services ensure
              your system operates at its highest potential. We use
              advanced monitoring tools to track energy output and
              identify inefficiencies. If panels are underperforming,
              we recommend repositioning or upgrading components.
              Battery storage is calibrated to maximize charge and
              discharge cycles, while inverters are fine-tuned for
              seamless conversion. We also provide software updates
              for smart monitoring systems, ensuring you have real-time
              insights into your energy usage. Optimization is about
              squeezing every watt of power from your system, reducing
              waste, and increasing savings.
            </p>
          </div>

          <div className="image">
            <img
              src="/images/solar-optimazation.jpg"
              alt="Solar performance optimization"
            />
          </div>

        </div>
      </section>

      {/* ===== REPAIRS ===== */}
      <section id="repairs" className="section alt">
        <div className="content">

          <div className="text">
            <h2>Repairs & Troubleshooting</h2>

            <p>
              When issues arise, our repair and troubleshooting
              services provide fast, reliable solutions. Whether
              it’s a cracked panel, faulty inverter, or degraded
              battery, our team is equipped to handle it. We diagnose
              problems using advanced diagnostic tools, ensuring
              accurate identification of faults. Repairs are carried
              out with genuine parts to maintain system integrity.
              We also offer troubleshooting support for software
              and monitoring systems, helping you resolve connectivity
              or data issues. Our goal is to minimize downtime and
              restore your system to full functionality quickly.
            </p>
          </div>

          <div className="image">
            <img
              src="/images/solar-repair.jpg"
              alt="Solar panel repair"
            />
          </div>

        </div>
      </section>

      {/* ===== EMERGENCY SUPPORT ===== */}
      <section id="emergency" className="section">
        <div className="content">

          <div className="text">
            <h2>Emergency Support</h2>

            <p>
              Power outages or sudden system failures can disrupt
              your life or business. Our emergency support services
              are designed to provide rapid response when you need
              it most. We maintain a dedicated hotline and deploy
              technicians promptly to restore functionality. Whether
              caused by extreme weather, grid instability, or
              equipment failure, we prioritize urgent cases to
              minimize downtime.
            </p>
          </div>

          <div className="image">
            <img
              src="/images/solar-support.jpg"
              alt="Emergency solar support"
            />
          </div>

        </div>
      </section>

      {/* ===== MAINTENANCE PACKAGES ===== */}
      <section id="packages" className="section alt">

        <div className="content packages-content">

          <div className="text">
            <h2>Solar Maintenance Packages</h2>

            <p>
              Choose the right plan for your solar investment.
              Each package is designed to meet different needs —
              from essential upkeep to full protection. Our goal
              is to keep your solar system efficient, reliable,
              and worry-free.
            </p>
          </div>

          <div className="packages-container">

            {/* Basic */}
            <div className="package-box basic">
              <i className="fas fa-search fa-3x"></i>

              <h3>Basic Care</h3>

              <p>
                Essential upkeep for optimal performance. Includes
                regular inspections, panel cleaning, and system
                checkups to ensure your solar setup runs smoothly
                year-round.
              </p>

              <ul>
                <li>Regular Inspections</li>
                <li>Panel Cleaning</li>
                <li>System Checkups</li>
              </ul>

                <button
                type="button"
                className="cta-btn"
                onClick={() => {
                    setFormData((prev) => ({
                    ...prev,
                    package: "basic"
                    }));

                    document
                    .getElementById("maintenance-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                >
                Request Service
            </button>
            </div>

            {/* Advanced */}
            <div className="package-box advanced">
              <i className="fas fa-wrench fa-3x"></i>

              <h3>Advanced Maintenance</h3>

              <p>
                Comprehensive service and performance boosts.
                We fine-tune efficiency, perform diagnostics,
                and provide monitoring support to maximize your
                system’s output.
              </p>

              <ul>
                <li>Efficiency Tuning</li>
                <li>Repairs & Diagnostics</li>
                <li>Monitoring Service</li>
              </ul>

              <button
            type="button"
            className="cta-btn"
            onClick={() => {
                setFormData((prev) => ({
                ...prev,
                package: "advanced"
                }));

                document
                .getElementById("maintenance-form")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            >
            Request Service
            </button>

            </div>

            {/* Premium */}
            <div className="package-box premium">
              <i className="fas fa-shield-alt fa-3x"></i>

              <h3>Premium Protection</h3>

              <p>
                Complete care and emergency support. Enjoy 24/7
                response, priority repairs, and full system
                warranty coverage for total peace of mind.
              </p>

              <ul>
                <li>24/7 Emergency Response</li>
                <li>Priority Repairs</li>
                <li>Full System Warranty</li>
              </ul>

              <button
                type="button"
                className="cta-btn"
                onClick={() => {
                    setFormData((prev) => ({
                    ...prev,
                    package: "premium"
                    }));

                    document
                    .getElementById("maintenance-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                >
                Request Service
            </button>
            </div>

          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section id="contact" className="section">

        <div className="content">

          <div className="text">

            <h2>Request Maintenance Service</h2>

            <p>
              Ready to keep your solar system running at peak
              performance? Fill out the form below to schedule
              a maintenance visit or request more information
              about our service packages. Our team will respond
              promptly to ensure your energy needs are met without
              interruption.
            </p>
                {error && (
                <p className="form-error">
                    {error}
                </p>
                )}

        

            <form
            id="maintenance-form"
            className="contact-form"
            onSubmit={handleSubmit}
            >

              
              <label htmlFor="package">Maintenance Package</label>

              <select
                    id="package"
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select a maintenance package</option>
                    <option value="basic">Basic Care</option>
                    <option value="advanced">Advanced Maintenance</option>
                    <option value="premium">Premium Protection</option>
                </select>
            <label htmlFor="type">Maintenance Type</label>

            <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                >
                <option value="">Select maintenance type</option>
                <option value="routine">Routine Maintenance</option>
                <option value="repair">Repair</option>
                <option value="emergency">Emergency</option>
            </select>

              <label htmlFor="description">Additional Details</label>

              <textarea
                id="description"
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the maintenance issue or service you need..."
            ></textarea>

              <button
                type="submit"
                className="cta-btn"
                disabled={loading}
                >
                {loading ? "Submitting..." : "Submit Request"}
            </button>

            </form>

          </div>

        </div>
      </section>

      {/* ===== CONFIRMATION MODAL ===== */}
{showModal && (
  <div className="modal">
    <div className="modal-content">
      <h3>Thank you!</h3>

      <p>
        Your maintenance request has been submitted.
        Our team will contact you shortly.
      </p>

      <button
        type="button"
        className="cta-btn"
        onClick={() => {
          setShowModal(false);
          navigate("/auth/my-maintenance");
        }}
      >
        View My Maintenance Requests
      </button>

      <button
        type="button"
        className="cta-btn"
        onClick={() => setShowModal(false)}
      >
        Close
      </button>
    </div>
  </div>
)}


    </div>
  );
}

export default Maintenance;
