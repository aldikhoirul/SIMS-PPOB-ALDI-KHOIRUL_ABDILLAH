import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransaction } from "../redux/apiThunk";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Saldo from "./Saldo";
import Swal from "sweetalert2";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.transactions);
  const [visibleTransactions, setVisibleTransactions] = useState(3);

  useEffect(() => {
    dispatch(getTransaction());
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleTransactions((prevVisibleTransactions) => prevVisibleTransactions + 3);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    Swal.fire("Error", error, "error");
    return <div className="text-center text-danger">Gagal mendapatkan data transaksi</div>;
  }

  return (
    <div className="container">
      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="row mt-4">
        <Saldo />

        {/* Riwayat Transaksi */}
        <h5>Semua Transaksi</h5>
        <ul className="list-group mb-4">
          {Array.isArray(transactions) && transactions.length > 0 ? (
            transactions.slice(0, visibleTransactions).map((value) => (
              <li key={value.id} className="list-group-item d-flex justify-content-between mb-2">
                <div>
                  <div>
                    {value.transaction_type === "TOPUP" ? (
                      <span className="text-success">+{value.total_amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>
                    ) : (
                      <span className="text-danger">- {value.total_amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>
                    )}
                  </div>
                  <div className="text-muted">{value.created_on}</div>
                </div>
                <div className="fs-6">{value.description}</div>
              </li>
            ))
          ) : (
            <li className="list-group-item d-flex justify-content-between mb-2">
              <div className="fs-6 text-muted">Tidak ada data transaksi</div>
            </li>
          )}
        </ul>

        {/* Tombol Show More */}
        {visibleTransactions < transactions.length && (
          <div className="text-center">
            <Link className="text-decoration-none" style={{ color: "#FF0000" }} onClick={handleLoadMore}>
              Show More
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
