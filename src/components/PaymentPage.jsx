import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { payment, getSaldo } from "../services/api";
import Navbar from "./Navbar";
import Saldo from "./Saldo";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const serviceData = location.state?.service;
  const [nominal, setNominal] = useState(serviceData?.service_tariff || "");
  const [saldo, setSaldo] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const response = await getSaldo();
        setSaldo(response.data.saldo);
      } catch (error) {
        console.error("Gagal mendapatkan saldo", error);
        setMessage("Gagal mendapatkan saldo");
      }
    };

    if (!serviceData) {
      Swal.fire("Kesalahan", "Layanan tidak ditemukan. Silakan pilih layanan terlebih dahulu.", "error");
      navigate("/");
    }

    fetchSaldo();
  }, [serviceData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nominal < serviceData?.service_tariff) {
      Swal.fire("Kesalahan", `Jumlah yang dimasukkan harus lebih besar atau sama dengan tarif layanan Rp ${serviceData?.service_tariff.toLocaleString()}`, "error");
      return;
    }

    if (nominal > saldo) {
      Swal.fire({
        icon: "error",
        title: "Saldo Tidak Cukup",
        text: `Saldo Anda tidak mencukupi untuk melakukan pembayaran sebesar Rp ${nominal}. Silakan lakukan top-up.`,
        showCancelButton: true,
        confirmButtonText: "Top Up",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/topup");
        }
      });
      return;
    }

    try {
      const response = await payment(serviceData.service_code, nominal);
      Swal.fire("Berhasil", `Pembayaran sebesar Rp ${nominal} berhasil!`, "success");
      setSaldo(saldo - nominal);
      setMessage("");
    } catch (error) {
      console.error(error.response?.data?.message || "Kesalahan terjadi");
      setMessage(error.response?.data?.message || "Kesalahan terjadi");
      Swal.fire("Gagal", error.response?.data?.message || "Kesalahan terjadi", "error");
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="row mt-4">
        <Saldo saldo={saldo} />

        {/* Form Pembayaran */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="service" className="form-label mb-4 fw-normal fs-5">
              Pembayaran
            </label>
            {serviceData && (
              <div className=" mb-4">
                <img src={serviceData.service_icon} alt={serviceData.service_name} className="img-thumbnail mb-3" style={{ width: "50px", height: "50px" }} />
                <h4 className="fs-5">{serviceData.service_name}</h4>
              </div>
            )}
          </div>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                <i className="bi bi-cash-stack"></i>
              </span>
              <input type="number" className="form-control" id="amount" placeholder="Masukkan Jumlah" value={nominal} onChange={(e) => setNominal(e.target.value)} required />
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
