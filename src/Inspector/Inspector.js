import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Protected from "./Protected";
import Verifyland from './Verifyland'
import Verifyuser from './Verifyuser'

import TransferOwnership from "./TransferOwnership";

function Inspector() {
  // const login =localStorage.getItem("login")
  // let login= false
  
  return (
    <div>

        <Login/>
      {/* <Routes>
        <Route  path="/" element={<Home />} />
      
     <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Protected Component={Dashboard} />} />
      
      <Route
        path="verifyland"
        element={<Protected Component={Verifyland} />}
      />
      <Route
        path="verifyuser"
        element={<Protected Component={Verifyuser} />}
      />
      <Route
        path="transferownership"
        element={<Protected Component={TransferOwnership} />}
      />
    </Routes>  */}
      
    </div>
  );
}

export default Inspector;
