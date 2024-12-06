import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import AccountPage from "./components/AccountPage";
import EditPage from "./components/EditPage";
import HomePage from "./components/HomePage";
import TopupPage from "./components/TopupPage";
import TransactionPage from "./components/TransactionPage";
import PaymentPage from "./components/PaymentPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<AccountPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/home" element={<ProtectedRoute component={HomePage} />} />
        <Route path="/topup" element={<TopupPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
