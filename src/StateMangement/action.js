export const incNumber=()=>{
    return {type:"INCREMENT"}}
export const decNumber=()=>{
    return {type:"DECREMENT"}}
 export   const connectWallet = () => ({
        type: 'CONNECT_WALLET'
      });
export const Contract=()=>({
    type:'Contract'
})

const SET_LAND_REGISTRY_CONTRACT = 'SET_LAND_REGISTRY_CONTRACT';

export function setLandRegistryContract(contractInstance) {
    return {
      type: SET_LAND_REGISTRY_CONTRACT,
      contractInstance,
    };
  }