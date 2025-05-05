import React, { createContext, useState } from 'react';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(5); // Start with $5

  const addMoney = (amount) => {
    setBalance(prev => prev + amount);
  };

  const deductMoney = (amount) => {
    setBalance(prev => Math.max(prev - amount, 0));
  };

  return (
    <WalletContext.Provider value={{ balance, addMoney, deductMoney }}>
      {children}
    </WalletContext.Provider>
  );
};