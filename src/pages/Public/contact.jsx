import Header from "../../components/Home/Header";
import Footer from "../../components/Home/Footer";
import "./contact.css"

export default function ContactPage() {
  return (
    <>
      

      <section className="contact-section">
        <div className="contact-container">

          {/* LEFT */}
          <div className="contact-info">
            <h2>Contact Us</h2>
            <p>
              We’d love to hear from you. Reach out for solar solutions, quotes, or support.
            </p>

            <div className="info-item">
              <span>📍</span>
              <p>Plot 207 Garki, Abuja</p>
            </div>

            <div className="info-item">
              <span>📞</span>
              <p>+234 808 3887 719</p>
            </div>

            <div className="info-item">
              <span>📧</span>
              <p>support@oasisenergy.com</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="contact-form">
            <form>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />

              <textarea placeholder="Your Message" rows="5" required></textarea>

              <button type="submit">Send Message</button>
            </form>
          </div>

        </div>
      </section>

    </>
  );
}