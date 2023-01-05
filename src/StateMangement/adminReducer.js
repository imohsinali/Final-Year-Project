
import data from "../Data/adminData";

import abi from "../contract/landregistry.json";
import { ethers } from "ethers";
export const initialState = {

    basket: data,
    connectWallect:{}
}

  

  

  

  const adminData = (state=initialState, action) => {

    // console.log(action);

    switch (action.type) {

      case "ADD":

        return {

          ...state,

          basket: [...state.basket, action.item],

        };

      case "REMOVE":

        const index = state.basket.findIndex(

          (basketItem) => basketItem.id === action.id

        );

        let newBasket = [...state.basket];

        if (index >= 0) {

          newBasket.splice(index, 1);

        } else {

          console.warn(

            `Cant remove product id ${action.id} as it is not in basket`

          );

        }

        return {

          ...state,

          basket: newBasket,

        };


    

      case "EMPTY_BASKET": {

        return { ...state, basket: [] };

      }
      case "ADMIN_CONTRACT":{
        return { ...state,contract: action.payload}; 
      }
      case "Connect_Wallet":{
        return {...state, wallet :async ()=> {
          const contractAddress = "0xBaA0A7E9b4E4CAB42b2d14665957eE555C0f9267";
          const contractAbi = abi.abi;
      
          try {
            const { ethereum } = window;
            if (ethereum) {
              const account = await ethereum.request({
                method: "eth_requestAccounts",
              });
            }
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
      
            const contract = new ethers.Contract(
              contractAddress,
              contractAbi,
              signer
            );
      
          } catch (error) {
            console.log(error);
          }
        }}
      }


      default:

        return state;

    }

  };

  

  export default adminData;

  
