import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/Logo.png";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg shadow-sm">
      <div className="d-flex align-items-center justify-content-center">
        <Link to={"/home"}>
          <img src={logo} alt="Logo" className="img-fluid me-2" style={{ width: "25px", height: "25px" }} />
        </Link>
        <h6 className="text-center m-0">SIMS PPOB</h6>
      </div>
      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className={`nav-link text-decoration-none ${location.pathname === "/topup" ? "active text-danger" : ""}`} to="/topup">
              Top Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link text-decoration-none ${location.pathname === "/transaction" ? "active text-danger" : ""}`} to="/transaction">
              Transaction
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link text-decoration-none ${location.pathname === "/profile" ? "active text-danger" : ""}`} to="/profile">
              Akun
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
