import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
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
              placeholder="Enter your password"
              required
              className={styles.input}
            />
            <div className={styles.inputGlow}></div>
          </div>
        </div>

        <button type="submit" className={styles.button}>
          <span className={styles.buttonText}>Initialize Login</span>
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

        {/* AI Processing Indicator */}
        <div className={styles.processingIndicator}>
          <div className={styles.processingDot}></div>
          <div className={styles.processingDot}></div>
          <div className={styles.processingDot}></div>
        </div>
      </form>

      {/* Bottom AI Text */}
      <div className={styles.bottomText}>
        <span className={styles.aiIcon}>🤖</span>
        Powered by Advanced AI Security
      </div>
    </div>
  );
};

export default LoginPage;