import React, { useState } from "react";
import { topUp } from "../services/api";
import Navbar from "./Navbar";
import Saldo from "./Saldo";
import Swal from "sweetalert2";

const TopupPage = () => {
  const [nominal, setNominal] = useState("");
  const [message, setMessage] = useState("");

  const handleNominalChange = (value) => {
    setNominal(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nominal <= 0) {
      Swal.fire("Error", "Nominal harus lebih besar dari Rp 0", "error");
      return;
    }

    if (nominal > 1000000) {
      Swal.fire("Error", "Nominal top up tidak boleh lebih dari Rp 1.000.000", "error");
      return;
    }

    try {
      const response = await topUp(nominal);
      Swal.fire("Berhasil", "Top up sebesar Rp " + nominal.toLocaleString() + " berhasil!", "success");
      setNominal("");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);

      if (error.response?.data?.message === "Saldo tidak mencukupi") {
        Swal.fire("Gagal", "Saldo Anda tidak mencukupi untuk melakukan top up.", "error");
      } else {
        Swal.fire("Error", error.response?.data?.message || "Terjadi kesalahan, coba lagi.", "error");
      }
      setMessage(error.response?.data?.message || "Terjadi kesalahan, coba lagi.");
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="row mt-4">
        <Saldo />
        <h2 className="fw-normal fs-5">Silahkan Masukan,</h2>
        <h2 className="fw-bold mb-5">Nominal Top Up</h2>

        {/* Form Top Up */}
        <div className="col-md-8 col-lg-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                  <i className="bi bi-cash-stack"></i>
                </span>
                <input type="number" className="form-control" id="nominal" value={nominal} onChange={(e) => setNominal(e.target.value)} placeholder="Masukkan nominal" required />
              </div>
            </div>
            <button type="submit" className="btn btn-danger w-100" disabled={nominal === ""}>
              Top Up
            </button>
          </form>
        </div>

        {/* Pilihan Nominal */}
        <div className="col-md-4 col-lg-4">
          <div>
            <div className="d-flex flex-wrap">
              {[10000, 20000, 50000, 100000, 250000, 500000, 1000000].map((value) => (
                <button key={value} className={`btn btn-outline-secondary m-1 ${window.innerWidth < 576 || window.innerWidth < 768 ? "btn-sm" : "btn-lg"}`} onClick={() => handleNominalChange(value)}>
                  Rp{value.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopupPage;
