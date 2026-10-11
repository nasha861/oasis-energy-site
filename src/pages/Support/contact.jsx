
import { useState } from "react";
import "./contact.css";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    console.log("Contact form submitted");
  };

  return (
    <main className="contact-page">

      {/* CONTACT SECTION */}
      <section className="contact-section">

        <div className="contact-container">

          {/* LEFT: CONTACT INFORMATION */}
          <div className="contact-info">

            <h2>Contact Us</h2>

            <p>
              We’d love to hear from you. Reach out for solar solutions,
              quotes, or support.
            </p>

            <hr />

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


          {/* RIGHT: CONTACT FORM */}
          <div className="contact-form">

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                placeholder="Full Name"
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                required
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
              />

              <textarea
                placeholder="Your Message"
                rows="5"
                required
              />

              <button type="submit">
                Send Message
              </button>

              {submitted && (
                <p className="contact-success">
                  Thank you! Your message has been received.
                </p>
              )}

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}

