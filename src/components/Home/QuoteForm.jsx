export default function Hero() {
  return (
    <section className="quote-section">
        <div className="quote-left">
        <h2>Save by Going Solar</h2>
        </div>
    <div className="quote-right">
      <form className="quote-form">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" required />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" required />

        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="phone">Mobile Phone</label>
        <input type="tel" id="phone" name="phone" required />

        <p className="fine-print">
          By clicking ‘Get a Quote’, I consent to receive automated text messages and prerecorded or automated telephone calls from Oasis Energy and its partners at the phone number provided. Consent is not required for purchase. Msg & data rates may apply.
        </p>

        <button type="submit" className="cta-btn">Get a Quote</button>
      </form>
    </div>
    </section>
  );
}