import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAuth } from "../redux/apiThunk";
import { clearMessage } from "../redux/authSlice";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import login from "../assets/images/Illustrasi Login.png";
import "../styles/style.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      dispatch(clearMessage());
      return alert("Password tidak sama");
    }

    dispatch(
      registerAuth({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
      })
    ).then(() => {
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setConfirmPass("");
    });
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
              <input type="email" className="form-control" placeholder="Masukkan email Anda" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
              <input type="text" className="form-control" placeholder="Nama depan" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="mb-4">
              <input type="text" className="form-control" placeholder="Nama belakang" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="mb-4">
              <input type="password" className="form-control" placeholder="Buat password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-4">
              <input type="password" className="form-control" placeholder="Konfirmasi password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-danger w-100" disabled={loading}>
              {loading ? "Loading..." : "Registrasi"}
            </button>
            <p className="text-center mt-3" style={{ fontSize: "12px" }}>
              Sudah punya akun? Login{" "}
              <Link to="/login" className="text-decoration-none" style={{ color: "#FF0000" }}>
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
