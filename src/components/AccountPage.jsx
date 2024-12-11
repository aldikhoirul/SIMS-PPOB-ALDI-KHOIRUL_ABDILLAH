// src/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/api";
import Navbar from "./Navbar";

const AccountPage = () => {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [last_name, setLastName] = useState(localStorage.getItem("lastName"));
  const [profileImage, setProfilImage] = useState(localStorage.getItem("profileImage"));
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setEmail(response.data.email);
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
      setProfilImage(response.data.profile_image);
    } catch (error) {
      console.error(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="d-flex flex-column align-items-center mt-4">
        <img src={profileImage} alt="Profile" className="img-fluid rounded-circle mb-4 profile-image" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} />
        <h2 className="mb-4">
          {firstName} {last_name}
        </h2>
        <form className="w-50">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                @
              </span>
              <input type="email" className="form-control" id="email" placeholder="email" value={email} disabled />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Nama Depan
            </label>
            <div className="input-group">
              <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                <i className="bi bi-person"></i>
              </span>
              <input type="text" className="form-control" id="firstName" placeholder="Nama depan" value={firstName} disabled />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Nama Belakang
            </label>
            <div className="input-group">
              <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                <i className="bi bi-person"></i>
              </span>
              <input type="text" className="form-control" id="lastName" placeholder="Nama belakang" value={last_name} disabled />
            </div>
          </div>
          <button type="button" className="btn btn-danger w-100" onClick={() => navigate("/edit")}>
            Edit Profil
          </button>
          <button type="button" className="btn text-danger border-danger w-100 mt-3" onClick={handleLogOut}>
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;
