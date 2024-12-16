import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, getSaldo } from "../redux/apiThunk";
import { toggleShowSaldo, clearError } from "../redux/saldoSlice";
import Swal from "sweetalert2";

const Saldo = () => {
  const dispatch = useDispatch();

  const { profile, saldo, showSaldo, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getSaldo());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Swal.fire("Gagal", error, "error");
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <>
      <div className="col-md-4 col-lg-5 mb-5">
        {profile.profile_image && <img src={profile.profile_image} alt="Profile" className="img-fluid rounded-circle mb-3" style={{ width: "50px", height: "50px" }} />}
        <h2 className="fw-normal fs-5">Selamat Datang,</h2>
        {profile.first_name && profile.last_name && (
          <h2 className="fw-bold">
            {profile.first_name} {profile.last_name}
          </h2>
        )}
      </div>
      <div className="col-md-8 col-lg-7">
        <div className="card rounded-4 mb-5 bg-danger" style={{ height: "75%" }}>
          <div className="card-body text-white pt-4">
            <h5 className="card-title fs-6">Saldo anda</h5>
            {loading ? <h2 className="card-text">Memuat...</h2> : showSaldo ? <h2 className="card-text">{saldo.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</h2> : <h2 className="card-text">{"•".repeat(4)}</h2>}
            <p className="card-text fs-6 mt-2">
              Lihat Saldo <i className={`bi bi-eye${showSaldo ? "-slash" : ""}`} onClick={() => dispatch(toggleShowSaldo())} style={{ cursor: "pointer" }}></i>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Saldo;
