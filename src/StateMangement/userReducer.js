const initialState = {
      isRegistered: false,
      userProfile:[],
      isVerified:false
    
  }
  
   const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_OPTION":
        return { ...state,isRegistered:true,userProfile:action.payload}; 
     case "Verify":
        return{...state,isVerified:true}
      default:
      return state;
    }
}

export default userReducer