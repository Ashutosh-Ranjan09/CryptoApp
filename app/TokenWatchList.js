"use client";
import WalletCard from "./WalletCard";
import { ethers } from "ethers";
import React, { useState } from "react";

const TokenWatchList = () => {
  const [tokenAddress, setTokenAddress] = useState(""); // State for token address input
  const [watchList, setWatchList] = useState([]); // State for watchlist
  const [tokenBalance, setTokenBalance] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const erc20ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
  ];

  const addTokenToWatchList = () => {
    if (tokenAddress && !watchList.includes(tokenAddress)) {
      setWatchList([...watchList, tokenAddress]);
      setTokenAddress(""); // Clear the input field
    }
  };

  const getTokenBalance = async (tokenAddress) => {
    if (!defaultAccount) {
      setErrorMessage("Connect your wallet first");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log("1");
      const contract = new ethers.Contract(tokenAddress, erc20ABI, provider);
      console.log("2");
      const balance = await contract.balanceOf(defaultAccount);
      console.log("3");
      const decimals = await contract.decimals();
      console.log("4");
      const balanceInEther = ethers.formatUnits(balance, decimals);
      console.log("5");
      setTokenBalance(balanceInEther);
      console.log("Balance in Token:", balanceInEther);
    } catch (error) {
      console.error("Error fetching token balance:", error); // Debugging: Log error
      setErrorMessage("Failed to fetch token balance");
    }
  };

  return (
    <div className="flex-col">
      <div className="">
        <div className="">
          <h4>Add Token to Watchlist</h4>
          <input
            className="border border-gray-600 rounded-sm p-1"
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="Enter token address"
          />
          <button
            className="border border-gray-600 rounded-sm p-1 ml-3"
            onClick={addTokenToWatchList}
          >
            Add Token
          </button>
        </div>

        <div>
          <h4 className="font-semibold">Watchlist : </h4>
          <ul>
            {watchList.map((token, index) => (
              <li key={index}>{token}</li>
            ))}
          </ul>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default TokenWatchList;
