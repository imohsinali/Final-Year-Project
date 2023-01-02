let initialstate={
isConnected:false
}
const walletReducer = (state=initialstate ,action) => {
    switch (action.type) {
      case 'CONNECT_WALLET':
        return {
          ...state,
          isConnected:true
        };
        case "Contract":
          return{
            ...state,
           contract:action.contract
          };
         case "Account":
          return{
          ...state,
          account:action.payload
         } 
      default:
        return state;
    }
  };
  
  export default walletReducer