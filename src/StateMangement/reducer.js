import adminData from "./adminReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";


const reducer=combineReducers(
    {adminData:adminData,
    userReducer:userReducer
}
    )


    export default reducer