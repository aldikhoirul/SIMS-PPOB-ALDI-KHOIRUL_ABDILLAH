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
    try {
      await topUp(nominal);
      Swal.fire("Berhasil", "Top up sebesar Rp " + nominal + " berhasil!", "success");
      setNominal("");
    } catch (error) {
      console.error(error.response.data.message);
      setMessage(error.response.data.message);
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
            <button type="submit" className="btn btn-danger w-100">
              Top Up
            </button>
          </form>
        </div>

        {/* Pilihan Nominal */}
        <div className="col-md-4 col-lg-4">
          <div>
            <div className="d-flex flex-wrap">
              {[10000, 20000, 50000, 100000, 250000, 500000].map((value) => (
                <button key={value} className="btn btn-outline-secondary m-1" onClick={() => handleNominalChange(value)}>
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
