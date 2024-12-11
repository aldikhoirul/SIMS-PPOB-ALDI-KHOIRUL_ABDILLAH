import React, { useState, useEffect } from "react";
import { getTransaction } from "../services/api";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Saldo from "./Saldo";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [visibleTransactions, setVisibleTransactions] = useState(3);
  const [error, setError] = useState("");

  const handleLoadMore = () => {
    setVisibleTransactions((prevVisibleTransactions) => prevVisibleTransactions + 3);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransaction();
        setTransactions(response.data.records);
      } catch (error) {
        console.error(error.response.data.message);
        setError(error.response.data.message);
      }
    };

    fetchTransactions();
  }, []);

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
          {transactions.slice(0, visibleTransactions).map((value) => (
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
          ))}
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
