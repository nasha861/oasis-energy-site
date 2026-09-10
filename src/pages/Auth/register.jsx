import { useState } from "react";
import "./auth.css";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setForm({
            form,
            [e.target.name]: e.target.value
        });
    };
    const validate = () => {
        let newErrors = {};
        if (form.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters";
        }
        if (!form.email.includes("@")) {
            newErrors.email = "Invalid email";
        }
          if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validate();
        if (Object.keys(validationErrors).length === 0){
            alert("Registration successful!");
        } else {
            setErrors(validationErrors);
        }
    };
    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleChange} >
            <h2>Register</h2>
            <input name= "name" placeholder="Full Name" onChange={handleChange} />
            <small className="error">{errors.name}</small>
            <input name="email" placeholder="Email" onChange={handleChange} />
            <small className="error">{errors.email}</small>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <small className="error">{errors.password}</small>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
            <small className="error">{errors.confirmPassword}</small>
            <button type="submit">Register</button>
            <p>
            Already have an account? <a href="/login">Login</a>
            </p>
            </form>
        </div>
    );
}