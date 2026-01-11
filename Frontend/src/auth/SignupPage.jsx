import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupPage.module.css";
import axios from "axios";
import api from "../api/axios";
const SignupPage = () => {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    deviceType: "",
    authorize: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.age) newErrors.age = "Age is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.deviceType) newErrors.deviceType = "Device type is required";
    if (!form.authorize) newErrors.authorize = "You must authorize AI tracking";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit


const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    name: form.name,
    email: form.email,
    password: form.password,
    age: parseInt(form.age, 10), // ✅ number
    gender: form.gender.toLowerCase(), // ✅ backend-safe
    deviceType: form.deviceType,
  };

  console.log("Payload:", payload);

  try {
    const response = await api.post(
      "/user/register",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Axios auto-parses JSON
    console.log("Response:", response.data);

    alert("Registration successful!");
    navigate("/login");

  } catch (error) {
    console.error("Signup Error:", error);

    // 🔥 Proper axios error handling
    if (error.response) {
      // Backend responded with error status (400, 409, 500, etc.)
      const message =
        typeof error.response.data === "string"
          ? error.response.data
          : error.response.data.message || "Registration failed";

      alert(message);

    } else if (error.request) {
      // Request sent but no response
      alert("Server not responding. Please try again later.");

    } else {
      // Something else went wrong
      alert(error.message);
    }
  }
};



  return (
    <div className={styles.container}>
      <div className={styles.bgParticles}>
        <div className={styles.particle1}></div>
        <div className={styles.particle2}></div>
        <div className={styles.particle3}></div>
      </div>

      <div className={styles.scanLine}></div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.logoContainer}>
          <div className={styles.logoGlow}>
            <svg className={styles.logo} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className={styles.statusBadge}>
          <span className={styles.statusDot}></span>
          AI Registration System
        </div>

        <h2 className={styles.title}>
          Create Account
          <span className={styles.subtitle}>Join the Neural Network</span>
        </h2>

        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label>Full Name</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={styles.input}
              />
              <div className={styles.inputGlow}></div>
            </div>
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label>Email Address</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={styles.input}
              />
              <div className={styles.inputGlow}></div>
            </div>
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                placeholder="Create secure password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={styles.input}
              />
              <div className={styles.inputGlow}></div>
            </div>
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          <div className={styles.field}>
            <label>Age</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                placeholder="Enter your age"
                name="age"
                value={form.age}
                onChange={handleChange}
                className={styles.input}
              />
              <div className={styles.inputGlow}></div>
            </div>
            {errors.age && <span className={styles.error}>{errors.age}</span>}
          </div>

          <div className={styles.field}>
            <label>Gender</label>
            <div className={styles.inputWrapper}>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <div className={styles.inputGlow}></div>
            </div>
            {errors.gender && <span className={styles.error}>{errors.gender}</span>}
          </div>

          <div className={styles.field}>
            <label>Device Type</label>
            <div className={styles.inputWrapper}>
              <select
                name="deviceType"
                value={form.deviceType}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Select device</option>
                <option>Desktop</option>
                <option>Mobile</option>
              </select>
              <div className={styles.inputGlow}></div>
            </div>
            {errors.deviceType && (
              <span className={styles.error}>{errors.deviceType}</span>
            )}
          </div>
        </div>

        <div className={styles.checkboxContainer}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="authorize"
              checked={form.authorize}
              onChange={handleChange}
            />
            <span className={styles.checkmark}></span>
            <span className={styles.checkboxText}>
              I authorize AI-powered activity tracking and analytics
            </span>
          </label>
          {errors.authorize && (
            <span className={styles.error}>{errors.authorize}</span>
          )}
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          <span className={styles.buttonText}>
            {loading ? "Creating Account..." : "Initialize Account"}
          </span>
          <div className={styles.buttonGlow}></div>
        </button>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <p className={styles.text}>
          Already have an account?{" "}
          <Link to="/login" className={styles.link}>
            Sign In
          </Link>
        </p>

        <div className={styles.processingIndicator}>
          <div className={styles.processingDot}></div>
          <div className={styles.processingDot}></div>
          <div className={styles.processingDot}></div>
        </div>
      </form>

      <div className={styles.bottomText}>
        <span className={styles.aiIcon}>🔒</span>
        Secured by Advanced AI Encryption
      </div>
    </div>
  );
};

export default SignupPage;
