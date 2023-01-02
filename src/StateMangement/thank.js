
import abi from "../contract/landregistry.json";
import { ethers } from "ethers";
import { connectWallet,Contract } from "./action";
// import { Contract } from 'ethers';

export const connectWalletThunk = () => {
    return async dispatch => {
        const contractAddress = "0xBaA0A7E9b4E4CAB42b2d14665957eE555C0f9267";
         const contractAbi = abi.abi; 
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          dispatch({
            type:'Account',
            payload:account
          })
          console.log(account)
        }
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
  
        // window.location.reload();
        const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          );
  // console.log(JSON.stringify(contract))
  let a=contract.ReturnAllLandIncpectorList()
        dispatch(connectWallet());
        dispatch({
        type:'Contract',
        contract: a.toString()
        }
        )
       
        
        
      } catch (error) {
        console.log(error);
  
        throw new Error("No ethereum object");
      }
    };
  };
  
 
    

     
   