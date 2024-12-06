// src/Profile.jsx
import React from "react";
import Navbar from "./Navbar";
import profile from "../assets/images/Profile Photo.png";
import "../styles/style.css";

const EditPage = () => {
  return (
    <div className="container">
      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="d-flex flex-column align-items-center mt-4">
        <img src={profile} alt="Profile" className="img-fluid rounded-circle mb-4 profile-image" />
        <h2 className="mb-4">Nama depan dan belakang</h2>
        <form className="w-50">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                @
              </span>
              <input type="email" className="form-control" id="email" placeholder="email" />
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
              <input type="text" className="form-control" id="firstName" placeholder="Nama depan" />
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
              <input type="text" className="form-control" id="lastName" placeholder="Nama belakang" />
            </div>
          </div>
          <button type="submit" className="btn btn-danger w-100">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
