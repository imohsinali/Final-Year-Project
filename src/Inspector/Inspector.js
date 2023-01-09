import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Protected from "./Protected";
import Verifyland from './Verifyland'
import Verifyuser from './Verifyuser'

import TransferOwnership from "./TransferOwnership";

function Inspector() {
  
  return (
    <div>

        <Login/>
      
      
    </div>
  );
}

export default Inspector;
