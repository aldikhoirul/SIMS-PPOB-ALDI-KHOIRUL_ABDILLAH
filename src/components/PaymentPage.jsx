import React from "react";
import Navbar from "./Navbar";
import profile from "../assets/images/Profile Photo.png";

const PaymentPage = () => {
  return (
    <div className="container">
      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="row mt-4">
        {/* User */}
        <div className="col-md-4 col-lg-5 mb-5">
          <img src={profile} alt="Profile" className="img-fluid rounded-circle mb-3" />
          <h2 className="fw-normal fs-5">Selamat Datang,</h2>
          <h2 className="fw-bold">[Nama Pengguna]</h2>
        </div>

        {/* Saldo */}
        <div className="col-md-8 col-lg-7">
          <div className="card rounded-4 mb-5 bg-danger" style={{ height: "75%" }}>
            <div className="card-body text-white pt-4">
              <h5 className="card-title fs-6">Saldo anda</h5>
              <h2 className="card-text">Rp 1.000.000</h2>
              <p className="card-text fs-6 mt-2">
                Lihat Saldo <i className="bi bi-eye-slash"></i>
              </p>
            </div>
          </div>
        </div>

        {/* Form Pembayaran */}
        <form>
          <div className="mb-3">
            <label htmlFor="service" className="form-label mb-4 fw-normal fs-5">
              Pembayaran
            </label>
            <select className="form-select" id="service" required>
              <option value="">Pilih Layanan</option>
              <option value="service1">Layanan 1</option>
              <option value="service2">Layanan 2</option>
              <option value="service3">Layanan 3</option>
            </select>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                <i className="bi bi-cash-stack"></i>
              </span>
              <input type="number" className="form-control" id="amount" placeholder="Masukkan Jumlah" required />
            </div>
          </div>
          <button type="submit" className="btn btn-danger w-100">
            Bayar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
