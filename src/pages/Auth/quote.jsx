
import { useState } from "react";
import bgImage from "../../assets/Homepage.webp";
import "./quote.css";

function Quote() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    source: [],
    homeowner: false,
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // Handle normal text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Handle "Where did you hear about us?"
  const handleSourceChange = (e) => {
    const { value, checked } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      source: checked
        ? [...previousData.source, value]
        : previousData.source.filter((item) => item !== value),
    }));
  };

  // Handle homeowner checkbox
  const handleHomeownerChange = (e) => {
    setFormData((previousData) => ({
      ...previousData,
      homeowner: e.target.checked,
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    console.log("Quote request:", formData);

    setShowPopup(true);
  };

  // Close confirmation popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <section
            className="quote-form"
            id="quote"
            style={{ backgroundImage: `url(${bgImage})` }}
            >
      <div className="form-container">
        <h2>
          Solar Made Simple, Safe, and Built for Your Future
        </h2>

        <p>
          We make solar simple. Our experts will guide you every step
          of the process. Submit your information today to get a free
          solar quote and get started.
        </p>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>

            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
            />

            {errors.firstName && (
              <small className="error-message">
                {errors.firstName}
              </small>
            )}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>

            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
            />

            {errors.lastName && (
              <small className="error-message">
                {errors.lastName}
              </small>
            )}
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">Address</label>

            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />

            {errors.address && (
              <small className="error-message">
                {errors.address}
              </small>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <small className="error-message">
                {errors.email}
              </small>
            )}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone</label>

            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />

            {errors.phone && (
              <small className="error-message">
                {errors.phone}
              </small>
            )}
          </div>

          {/* How did you hear about us? */}
          <div className="form-group">
            <label>Where did you hear about us?</label>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  value="social"
                  checked={formData.source.includes("social")}
                  onChange={handleSourceChange}
                />
                Social Media
              </label>

              <label>
                <input
                  type="checkbox"
                  value="friend"
                  checked={formData.source.includes("friend")}
                  onChange={handleSourceChange}
                />
                Friend/Referral
              </label>

              <label>
                <input
                  type="checkbox"
                  value="advert"
                  checked={formData.source.includes("advert")}
                  onChange={handleSourceChange}
                />
                Advertisement
              </label>

              <label>
                <input
                  type="checkbox"
                  value="other"
                  checked={formData.source.includes("other")}
                  onChange={handleSourceChange}
                />
                Other
              </label>
            </div>
          </div>

          {/* Homeowner */}
          <div className="form-group homeowner">
            <label>
              <input
                type="checkbox"
                name="homeowner"
                checked={formData.homeowner}
                onChange={handleHomeownerChange}
              />
              I am a homeowner
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className="btn">
            Get a Free Quote
          </button>
        </form>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Thank you!</h3>

            <p>
              Your request has been submitted. We'll contact you
              soon with your free solar quote.
            </p>

            <button
              type="button"
              onClick={closePopup}
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Quote;
