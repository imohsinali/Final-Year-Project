import adminData from "./adminReducer";
import userReducer from "./userReducer";
import walletReducer from './walletReducer'
import { combineReducers } from "redux";


const reducer=combineReducers(
    {adminData:adminData,
    userReducer:userReducer,
    wallet: walletReducer

}
    )


    export default reducer