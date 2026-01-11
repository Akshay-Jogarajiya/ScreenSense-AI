import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./EditProfile.module.css";
import api from "../api/axios";

const EditProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    email: "",
    name: "",
    age: "",
    gender: "",
    deviceType: "",
    goal: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // 🔹 Fetch profile on component mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/user/profile/${userId}`);
        console.log("Response: ", response);
        const data = response.data;
        
        setProfile({
          email: data.email || "",
          name: data.name || "",
          age: data.age || "",
          gender: data.gender || "",
          deviceType: data.deviceType || "",
          goal: data.goal || "",
          time: data.time || "",
        });
      } catch (error) {
        console.error("Profile Fetch Error:", error);
        alert("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Validation
  const validate = () => {
    const newErrors = {};
    Object.keys(profile).forEach((key) => {
      if (!profile[key]) {
        newErrors[key] = `${key} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Submit edited profile
  const handleEditProfile = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const email = profile.email;

      const payload = {
        name: profile.name,
        age: Number(profile.age),
        gender: profile.gender,
        deviceType: profile.deviceType,
        goal: profile.goal,
        time: profile.time,
      };

      console.log("Update Payload:", payload);

      const response = await api.put(
        `/user/profile/update/${encodeURIComponent(email)}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update response:", response.data);

      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Update Error:", error);

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Profile update failed";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

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

      <div className={styles.card}>
        {/* Back Button */}
        <button
          className={styles.backButton}
          onClick={() => navigate("/dashboard")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Back to Dashboard</span>
        </button>

        {/* AI Logo Icon */}
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
          Profile Editor Active
        </div>

        <h2 className={styles.title}>
          Edit Profile
          <span className={styles.subtitle}>AI-Powered Productivity Profile</span>
        </h2>

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loader}>
              <div className={styles.loaderDot}></div>
              <div className={styles.loaderDot}></div>
              <div className={styles.loaderDot}></div>
            </div>
            <p className={styles.loadingText}>Loading profile data...</p>
          </div>
        ) : (
          <div className={styles.form}>
            {/* Email */}
            <div className={styles.field}>
              <label>Email Address</label>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled
                  className={styles.input}
                />
                <div className={styles.inputGlow}></div>
                <div className={styles.lockIcon}>🔒</div>
              </div>
              <span className={styles.helpText}>Email cannot be changed</span>
            </div>

            {/* Name */}
            <div className={styles.field}>
              <label>Full Name</label>
              <div className={styles.inputWrapper}>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={styles.input}
                />
                <div className={styles.inputGlow}></div>
              </div>
              {errors.name && (
                <span className={styles.error}>⚠️ {errors.name}</span>
              )}
            </div>

            {/* Age */}
            <div className={styles.field}>
              <label>Age</label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  className={styles.input}
                />
                <div className={styles.inputGlow}></div>
              </div>
              {errors.age && (
                <span className={styles.error}>⚠️ {errors.age}</span>
              )}
            </div>

            {/* Gender */}
            <div className={styles.field}>
              <label>Gender</label>
              <div className={styles.inputWrapper}>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className={styles.input}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className={styles.inputGlow}></div>
              </div>
              {errors.gender && (
                <span className={styles.error}>⚠️ {errors.gender}</span>
              )}
            </div>

            {/* Device Type */}
            <div className={styles.field}>
              <label>Device Type</label>
              <div className={styles.inputWrapper}>
                <select
                  name="deviceType"
                  value={profile.deviceType}
                  onChange={handleChange}
                  className={styles.input}
                >
                  <option value="">Select device</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Mobile">Mobile</option>
                </select>
                <div className={styles.inputGlow}></div>
              </div>
              {errors.deviceType && (
                <span className={styles.error}>⚠️ {errors.deviceType}</span>
              )}
            </div>

            {/* Goal */}
            <div className={styles.field}>
              <label>Productivity Goal</label>
              <div className={styles.inputWrapper}>
                <input
                  name="goal"
                  value={profile.goal}
                  onChange={handleChange}
                  placeholder="e.g. Increase focus time"
                  className={styles.input}
                />
                <div className={styles.inputGlow}></div>
              </div>
              {errors.goal && (
                <span className={styles.error}>⚠️ {errors.goal}</span>
              )}
            </div>

            {/* Time */}
            <div className={styles.field}>
              <label>Target Time</label>
              <div className={styles.inputWrapper}>
                <input
                  name="time"
                  value={profile.time}
                  onChange={handleChange}
                  placeholder="e.g. 2 hrs/day"
                  className={styles.input}
                />
                <div className={styles.inputGlow}></div>
              </div>
              {errors.time && (
                <span className={styles.error}>⚠️ {errors.time}</span>
              )}
            </div>

            <button
              className={styles.button}
              onClick={handleEditProfile}
              disabled={loading}
            >
              <span className={styles.buttonText}>
                {loading ? "Saving Changes..." : "Save Changes"}
              </span>
              <div className={styles.buttonGlow}></div>
            </button>
          </div>
        )}

        {/* AI Processing Indicator */}
        <div className={styles.processingIndicator}>
          <div className={styles.processingDot}></div>
          <div className={styles.processingDot}></div>
          <div className={styles.processingDot}></div>
        </div>
      </div>

      {/* Bottom AI Text */}
      <div className={styles.bottomText}>
        <span className={styles.aiIcon}>⚙️</span>
        AI Profile Optimization System
      </div>
    </div>
  );
};

export default EditProfile;