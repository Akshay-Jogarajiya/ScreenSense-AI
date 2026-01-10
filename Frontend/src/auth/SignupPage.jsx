import { Link } from "react-router-dom";
import styles from "./SignupPage.module.css";

const SignupPage = () => {
  return (
    <div className={styles.container}>
      {/* Animated background particles */}
      <div className={styles.bgParticles}>
        <div className={styles.particle1}></div>
        <div className={styles.particle2}></div>
        <div className={styles.particle3}></div>
      </div>

      {/* Scanning line effect */}
      <div className={styles.scanLine}></div>

      <form className={styles.form}>
        {/* AI Logo/Icon */}
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

        {/* AI Status Badge */}
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
                required
                className={styles.input}
              />
              <div className={styles.inputGlow}></div>
            </div>
          </div>

          <div className={styles.field}>
            <label>Email Address</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className={styles.input}
              />
              <div className={styles.inputGlow}></div>
            </div>
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                placeholder="Create secure password"
                required
                className={styles.input}
              />
              <div className={styles.inputGlow}></div>
            </div>
          </div>

          <div className={styles.field}>
            <label>Age</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                placeholder="Enter your age"
                required
                className={styles.input}
              />
              <div className={styles.inputGlow}></div>
            </div>
          </div>

          <div className={styles.field}>
            <label>Gender</label>
            <div className={styles.inputWrapper}>
              <select required className={styles.input}>
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <div className={styles.inputGlow}></div>
            </div>
          </div>

          <div className={styles.field}>
            <label>Device Type</label>
            <div className={styles.inputWrapper}>
              <select required className={styles.input}>
                <option value="">Select device</option>
                <option>Desktop</option>
                <option>Mobile</option>
              </select>
              <div className={styles.inputGlow}></div>
            </div>
          </div>
        </div>

        {/* Permission Checkbox */}
        <div className={styles.checkboxContainer}>
          <label className={styles.checkbox}>
            <input type="checkbox" required />
            <span className={styles.checkmark}></span>
            <span className={styles.checkboxText}>
              I authorize AI-powered activity tracking and analytics
            </span>
          </label>
        </div>

        <button type="submit" className={styles.button}>
          <span className={styles.buttonText}>Initialize Account</span>
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

        {/* AI Processing Indicator */}
        <div className={styles.processingIndicator}>
          <div className={styles.processingDot}></div>
          <div className={styles.processingDot}></div>
          <div className={styles.processingDot}></div>
        </div>
      </form>

      {/* Bottom AI Text */}
      <div className={styles.bottomText}>
        <span className={styles.aiIcon}>🔒</span>
        Secured by Advanced AI Encryption
      </div>
    </div>
  );
};

export default SignupPage;