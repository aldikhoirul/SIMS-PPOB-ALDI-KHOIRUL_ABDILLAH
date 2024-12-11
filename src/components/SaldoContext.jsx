import React, { createContext, useState, useContext } from "react";

const SaldoContext = createContext();

export const SaldoProvider = ({ children }) => {
  const [showSaldo, setShowSaldo] = useState(false);

  const toggleShowSaldo = () => {
    setShowSaldo((prev) => !prev);
  };

  return <SaldoContext.Provider value={{ showSaldo, toggleShowSaldo }}>{children}</SaldoContext.Provider>;
};

// Hook untuk menggunakan context
export const useSaldo = () => {
  return useContext(SaldoContext);
};
