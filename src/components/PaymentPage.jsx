import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { payment, getSaldo } from "../redux/apiThunk";
import { clearPaymentState } from "../redux/paymentSlice";
import Navbar from "./Navbar";
import Saldo from "./Saldo";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serviceData = location.state?.service;

  const { saldo, paymentStatus, error, loading } = useSelector((state) => state.payment);

  const [nominal, setNominal] = useState(serviceData?.service_tariff || "");

  useEffect(() => {
    if (!serviceData) {
      Swal.fire("Kesalahan", "Layanan tidak ditemukan. Silakan pilih layanan terlebih dahulu.", "error");
      navigate("/");
    } else {
      dispatch(getSaldo());
    }
  }, [serviceData, navigate, dispatch]);

  useEffect(() => {
    dispatch(getSaldo());

    if (paymentStatus === "success") {
      Swal.fire("Berhasil", `Pembayaran sebesar Rp ${nominal.toLocaleString()} berhasil!`, "success");
      dispatch(clearPaymentState());
    }

    if (paymentStatus === "failure") {
      Swal.fire("Gagal", error, "error");
      dispatch(clearPaymentState());
    }
  }, [paymentStatus, error, nominal, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nominal < serviceData?.service_tariff) {
      Swal.fire("Kesalahan", `Jumlah yang dimasukkan harus lebih besar atau sama dengan tarif layanan Rp ${serviceData?.service_tariff.toLocaleString()}`, "error");
      return;
    }

    if (nominal > saldo) {
      Swal.fire({
        icon: "error",
        title: "Saldo Tidak Cukup",
        text: `Saldo Anda tidak cukup. Silakan lakukan top-up.`,
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

    dispatch(payment({ service_code: serviceData.service_code, total_amount: nominal }));
  };

  return (
    <div className="container">
      <Navbar />
      <div className="row mt-4">
        <Saldo saldo={saldo} />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="service" className="form-label mb-4 fw-normal fs-5">
              Pembayaran
            </label>
            {serviceData && (
              <div className="mb-4">
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
          <button type="submit" className="btn btn-danger w-100" disabled={loading}>
            {loading ? "Memproses..." : "Bayar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
