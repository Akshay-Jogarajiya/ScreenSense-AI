import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import axios from "axios";
import api from "../api/axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);

  const payload = { email, password };
  console.log("Payload:", payload);

  try {
    const response = await api.post(
      "/user/login",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
console.log('Response: ',response)
    // Axios auto-parses JSON
    if (response.status == 200) {
  localStorage.setItem("token", response.data.token); // ✅ save token
  localStorage.setItem("userId", response.data.userId); // ✅ save token
  navigate("/dashboard");
  console.log("Login success:", response.data);
}

    // console.log("Login success:", response.data);

    // navigate("/dashboard");

  } catch (error) {
    console.error("Login Error:", error);

    if (error.response) {
      // Backend returned error (400, 401, 404, etc.)
      const message =
        typeof error.response.data === "string"
          ? error.response.data
          : error.response.data.message || "Login failed";

      alert(message);

    } else if (error.request) {
      // Request sent but no response
      alert("Server not responding. Please try again later.");

    } else {
      // Unknown error
      alert(error.message);
    }

  } finally {
    setLoading(false);
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
          AI System Active
        </div>

        <h2 className={styles.title}>
          Secure Access
          <span className={styles.subtitle}>Neural Authentication Portal</span>
        </h2>

        <div className={styles.field}>
          <label>Email Address</label>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              placeholder="Enter your password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={styles.inputGlow}></div>
          </div>
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          <span className={styles.buttonText}>
            {loading ? "Logging in..." : "Initialize Login"}
          </span>
          <div className={styles.buttonGlow}></div>
        </button>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <p className={styles.text}>
          Don't have an account?{" "}
          <Link to="/signup" className={styles.link}>
            Create Account
          </Link>
        </p>

        <div className={styles.processingIndicator}>
          <div className={styles.processingDot}></div>
          <div className={styles.processingDot}></div>
          <div className={styles.processingDot}></div>
        </div>
      </form>

      <div className={styles.bottomText}>
        <span className={styles.aiIcon}>🤖</span>
        Powered by Advanced AI Security
      </div>
    </div>
  );
};

export default LoginPage;
