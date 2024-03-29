import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "../contract/landregistry.json";

export const TransactionContext = React.createContext();

const { ethereum } = window;
// const contractAddress="0x0C84632F86C08850Db4BbFC2b2C0f4AddB19EB79"
const contractAddress = "0x71c1a7AE879D0E47d0987E6afd409b79B9Ae8f3D";
const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI.abi,
    signer
  );

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  // const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  // const [transactions, setTransactions] = useState(localStorage.getItem('transaction'));
  const [contract, setContract] = useState();
  const [provider, setProvider] = useState();

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const transactionsContract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        signer
      );
      setContract(transactionsContract);
      setProvider(provider);
      console.log("hello 2", provider);
      console.log("hello", transactionsContract);

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions =
          await transactionsContract.ReturnAllLandIncpectorList();
        console.log(availableTransactions);
        // const structuredTransactions = availableTransactions.map((transaction) => ({
        //   name: transaction.name,
        //   age: parseInt(transaction.age._hex),
        //   // timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        //   city: transaction.city,
        //   // keyword: transaction.keyword,
        //   // amount: parseInt(transaction.amount._hex) / (10 ** 18)
        // }));

        // console.log(structuredTransactions);

        // setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

   // console.log(checkIfWalletIsConnect())
   const connectWallet = async () => {
     try {
       setProcessing(true);

       // Check if the `ethereum` object is available
       if (!window.ethereum) {
         throw new Error("Please install MetaMask");
       }

       // Prompt the user to connect their wallet
       await window.ethereum.enable();

       // Check if the user has already granted permission
       const accounts = await window.ethereum.request({
         method: "eth_accounts",
       });
       if (accounts.length === 0) {
         throw new Error("Please connect your MetaMask wallet");
       }

       // Get the current account and set up the contract
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const signer = provider.getSigner();
       const transactionsContract = new ethers.Contract(
         contractAddress,
         contractABI.abi,
         signer
       );
       setCurrentAccount(accounts[0]);
       setContract(transactionsContract);

       // Reload the page (optional)
       // window.location.reload();
     } catch (error) {
       console.log(error);
       throw error;
     }
   };



  useEffect(() => {
    checkIfWalletIsConnect();
    getAllTransactions();
  }, []);
  const [coordinates, setCoordinates] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [processing, setProcessing] = useState(false);


  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        checkIfWalletIsConnect,
        setCoordinates,
        currentAccount,
        contract,
        provider,
        coordinates,
        isModalVisible,
        setIsModalVisible,
        processing,
        setProcessing,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
