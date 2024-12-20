// Redux Setup
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAuth } from "../redux/apiThunk";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import login from "../assets/images/Illustrasi Login.png";
import "../styles/style.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginAuth({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.error("Login gagal:", err);
      });
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 h-100 m-0 rounded overflow-hidden">
        {/* Form */}
        <div className="col-md-12 col-lg-6 col-xl-5 p-5 mt-5 align-self-center">
          <div className="d-flex align-items-center justify-content-center mb-5">
            <img src={logo} alt="Logo" className="img-fluid me-2" style={{ width: "25px", height: "25px" }} />
            <h4 className="text-center m-0">SIMS PPOB</h4>
          </div>
          <h2 className="mb-5 text-center">Masuk atau buat akun untuk memulai</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                  @
                </span>
                <input type="email" name="email" className="form-control" id="email" placeholder="masukan email anda" onChange={(e) => setEmail(e.target.value)} value={email} />
              </div>
            </div>
            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                  <i className="bi bi-lock"></i>
                </span>
                <input type="password" name="password" className="form-control" id="password" placeholder="masukan password anda" onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>
            </div>
            <button type="submit" className="btn btn-danger w-100" disabled={loading}>
              {loading ? "Loading..." : "Masuk"}
            </button>
            <p className="text-center mt-3" style={{ fontSize: "12px" }}>
              belum punya akun? registrasi{" "}
              <Link className="text-decoration-none" style={{ color: "#FF0000" }} to="/">
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

export default LoginForm;
