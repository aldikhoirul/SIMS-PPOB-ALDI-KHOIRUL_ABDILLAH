import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import login from "../assets/images/Illustrasi Login.png";
import "../styles/style.css";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      setError("Password tidak sama");
      return;
    }

    try {
      const response = await axios.post("https://take-home-test-api.nutech-integrasi.com/registration", {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
      });
      setMessage(response.data.message);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setConfirmPass("");
      setError("");
    } catch (err) {
      setMessage("");
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 m-0 rounded overflow-hidden">
        {/* Form */}
        <div className="col-md-12 col-lg-6 col-xl-5 p-5 mt-5 align-self-center">
          <div className="d-flex align-items-center justify-content-center mb-5">
            <img src={logo} alt="Logo" className="img-fluid me-2" style={{ width: "25px", height: "25px" }} />
            <h4 className="text-center m-0">SIMS PPOB</h4>
          </div>
          <h2 className="mb-5 text-center">Lengkapi data untuk membuat akun</h2>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                  @
                </span>
                <input type="email" className="form-control" id="email" placeholder="masukan email anda" onChange={(e) => setEmail(e.target.value)} value={email} />
              </div>
            </div>
            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                  <i className="bi bi-person"></i>
                </span>
                <input type="text" className="form-control" id="first_name" placeholder="nama depan" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
              </div>
            </div>
            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                  <i className="bi bi-person"></i>
                </span>
                <input type="text" className="form-control" id="last_name" placeholder="nama belakang" onChange={(e) => setLastName(e.target.value)} value={lastName} />
              </div>
            </div>
            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                  <i className="bi bi-lock"></i>
                </span>
                <input type="password" className="form-control" id="password" placeholder="buat password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>
            </div>
            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                  <i className="bi bi-lock"></i>
                </span>
                <input type="password" className="form-control" id="confirmPassword" placeholder="konfirmasi password" onChange={(e) => setConfirmPass(e.target.value)} value={confirmPass} />
              </div>
            </div>
            <button type="submit" className="btn btn-danger w-100">
              Registrasi
            </button>
            <p className="text-center mt-3" style={{ fontSize: "12px" }}>
              sudah punya akun? login{" "}
              <Link className="text-decoration-none" style={{ color: "#FF0000" }} to="/login">
                di sini
              </Link>
            </p>
          </form>
        </div>
        {/* Image */}
        <div className="d-none d-lg-block col-lg-6 col-xl-7 p-0 right-side">
          <img src={login} alt="Login" className="img-fluid w-100 h-100" style={{ objectFit: "cover" }} />
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
