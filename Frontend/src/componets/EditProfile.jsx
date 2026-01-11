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
  console.log("profiles Date: ", profile);
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
        // console.log('Data: ',data)
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

      const email = profile.email; // email comes from fetched profile

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
      <div className={styles.card}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/dashboard")}
        >
          ← Back
        </button>

        <h2 className={styles.title}>Edit Profile</h2>
        <p className={styles.subtitle}>AI-powered productivity profile</p>

        {loading ? (
          <p>Loading profile...</p>
        ) : (
          <div className={styles.form}>
            {/* Email */}
            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                name="email" // ✅ REQUIRED
                value={profile.email}
                onChange={handleChange}
              />
            </div>

            {/* Name */}
            <div className={styles.field}>
              <label>Name</label>
              <input name="name" value={profile.name} onChange={handleChange} />
              {errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </div>

            {/* Age */}
            <div className={styles.field}>
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
              />
              {errors.age && <span className={styles.error}>{errors.age}</span>}
            </div>

            {/* Gender */}
            <div className={styles.field}>
              <label>Gender</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <span className={styles.error}>{errors.gender}</span>
              )}
            </div>

            {/* Device Type */}
            <div className={styles.field}>
              <label>Device Type</label>
              <select
                name="deviceType"
                value={profile.deviceType}
                onChange={handleChange}
              >
                <option value="">Select device</option>
                <option value="Desktop">Desktop</option>
                <option value="Mobile">Mobile</option>
              </select>
              {errors.deviceType && (
                <span className={styles.error}>{errors.deviceType}</span>
              )}
            </div>

            {/* Goal */}
            <div className={styles.field}>
              <label>Goal</label>
              <input name="goal" value={profile.goal} onChange={handleChange} />
              {errors.goal && (
                <span className={styles.error}>{errors.goal}</span>
              )}
            </div>

            {/* Time */}
            <div className={styles.field}>
              <label>Time</label>
              <input
                name="time"
                value={profile.time}
                onChange={handleChange}
                placeholder="e.g. 2 hrs/day"
              />
              {errors.time && (
                <span className={styles.error}>{errors.time}</span>
              )}
            </div>

            <button className={styles.button} onClick={handleEditProfile}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
