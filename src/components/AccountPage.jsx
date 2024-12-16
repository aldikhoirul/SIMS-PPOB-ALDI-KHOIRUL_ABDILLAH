import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../redux/apiThunk";
import { clearProfileState } from "../redux/profileSlice";
import Navbar from "./Navbar";

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, firstName, lastName, profileImage, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(clearProfileState());
    navigate("/login");
  };

  return (
    <div className="container">
      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="d-flex flex-column align-items-center mt-4">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-danger">{error}</div>
        ) : (
          <>
            <img src={profileImage} alt="Profile" className="img-fluid rounded-circle mb-4 profile-image" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} />
            <h2 className="mb-4">
              {firstName} {lastName}
            </h2>
            <form className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-group">
                  <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                    @
                  </span>
                  <input type="email" className="form-control" id="email" placeholder="email" value={email || ""} disabled />
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
                  <input type="text" className="form-control" id="firstName" placeholder="Nama depan" value={firstName || ""} disabled />
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
                  <input type="text" className="form-control" id="lastName" placeholder="Nama belakang" value={lastName || ""} disabled />
                </div>
              </div>
              <button type="button" className="btn btn-danger w-100" onClick={() => navigate("/edit")}>
                Edit Profil
              </button>
              <button type="button" className="btn text-danger border-danger w-100 mt-3" onClick={handleLogOut}>
                Logout
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
