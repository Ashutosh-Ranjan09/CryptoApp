"use client";
import React, { useState } from "react";
import { ethers } from "ethers";

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
    } else {
      setErrorMessage("Install Metamask");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
  };

  const getUserBalance = async (address) => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      const balanceInEther = ethers.formatEther(balance);
      setUserBalance(balanceInEther);
    } catch (error) {
      console.error("Error fetching balance:", error); // Debugging: Log error
      setErrorMessage("Failed to fetch balance");
    }
  };
  return (
    <div className="">
      <div className="flex flex-col items-center">
        <h4 className="text-lg text-center font-semibold">
          Connect to MetaMask
        </h4>
        <button
          className="bg-blue-400 rounded-md text-white border p-1"
          onClick={connectWalletHandler}
        >
          {connButtonText}
        </button>
      </div>
      <div>
        <h3 className="font-semibold">Address: {defaultAccount}</h3>
      </div>
      <div>
        <h3 className="font-semibold">Balance: {userBalance}</h3>
      </div>
      {errorMessage}
    </div>
  );
};

export default WalletCard;
