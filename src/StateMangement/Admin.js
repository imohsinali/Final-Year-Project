import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "../contract/landregistry.json";

export const TransactionContext = React.createContext();

const { ethereum } = window;
const contractAddress="0x0C84632F86C08850Db4BbFC2b2C0f4AddB19EB79"
const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI.abi, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  // const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  // const [transactions, setTransactions] = useState(localStorage.getItem('transaction'));
  const [contract,setContract]=useState()

  

 
  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
       const transactionsContract = new ethers.Contract(contractAddress, contractABI.abi, signer);
       setContract(transactionsContract)
       console.log("hello", transactionsContract)

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

        const availableTransactions = await transactionsContract.ReturnAllLandIncpectorList()
         console.log(availableTransactions)
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



  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
       const transactionsContract = new ethers.Contract(contractAddress, contractABI.abi, signer);
       setContract(transactionsContract)
       console.log("hello", transactionsContract)

      // window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };
  // console.log(checkIfWalletIsConnect())


  useEffect(() => {
    checkIfWalletIsConnect();
    getAllTransactions()
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        checkIfWalletIsConnect,
        currentAccount,
        contract
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};