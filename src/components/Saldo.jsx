import React, { useState, useEffect } from "react";
import { getProfile, getSaldo } from "../services/api";
import { useSaldo } from "../components/SaldoContext";

const Saldo = () => {
  const { showSaldo, toggleShowSaldo } = useSaldo();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilImage, setProfilImage] = useState("");
  const [saldo, setSaldo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [profilResponse, saldoResponse] = await Promise.all([getProfile(), getSaldo()]);
        setFirstName(profilResponse.data.first_name);
        setLastName(profilResponse.data.last_name);
        setProfilImage(profilResponse.data.profile_image);
        setSaldo(saldoResponse.data.balance);
      } catch (error) {
        console.error(error.response?.data?.message || "Error fetching data");
        setError(error.response?.data?.message || "Kesalahan terjadi.");
      }
    };
    fetchProfile();
  });

  return (
    <>
      <div className="col-md-4 col-lg-5 mb-5">
        {profilImage && <img src={profilImage} alt="Profile" className="img-fluid rounded-circle mb-3" style={{ width: "50px", height: "50px" }} />}
        <h2 className="fw-normal fs-5">Selamat Datang,</h2>
        {firstName && lastName && (
          <h2 className="fw-bold">
            {firstName} {lastName}
          </h2>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="col-md-8 col-lg-7">
        <div className="card rounded-4 mb-5 bg-danger" style={{ height: "75%" }}>
          <div className="card-body text-white pt-4">
            <h5 className="card-title fs-6">Saldo anda</h5>
            {showSaldo ? <h2 className="card-text">{saldo.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</h2> : <h2 className="card-text">{"•".repeat(4)}</h2>}
            <p className="card-text fs-6 mt-2">
              Lihat Saldo <i className={`bi bi-eye${showSaldo ? "-slash" : ""}`} onClick={toggleShowSaldo} style={{ cursor: "pointer" }}></i>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Saldo;
