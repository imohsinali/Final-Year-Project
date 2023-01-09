import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import admin from './images/Admin.png'
import inspector from './images/inspector.png'
import User from './images/user.png'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./Admin/Login";
import Admin from "./Admin/Admin";
import Dashboard from "./Admin/Dashboard";
import Protected from "./Admin/Protected";
import AddLandInspector from "./Admin/AddLandInspector";
import AllLandInspector from "./Admin/AllLandInspector";


import Inspector from "./Inspector/Inspector";
import IDashboard from "./Inspector/Dashboard";
import IProtected from "./Inspector/Protected";
import IVerifyland from './Inspector/Verifyland'
import IVerifyuser from './Inspector/Verifyuser'
import ITransferOwnership from "./Inspector/TransferOwnership";


import Registration from "./User/Registration";
import ULogin from "./User/Login";
import UDashboard from "./User/Dashboard";
import ULandGallery from "./User/LandGallery";
import UProtected from "./User/Protected";
import UAddLand from "./User/AddLand";
import Profile from "./User/Profile";
const App = () => {
  
const [path,setPath]=useState({Inspector:true,Admin:true,User:true})
   
  return (

    <Router>
      <Routes>
        <Route path="/" element={<div className ='home'>
      <nav className="home-nav">
      <h1>Land Registry</h1>
      <ul>

      <li>
        <Link to={'Inspectorlogin'} onClick={()=>setPath({Inspector:true,Admin:false,User:false})}   style={{ textDecoration: 'none' }} >
            <Button >Inspector</Button>
          </Link>
        </li>
        <li>
          <Link to={"Adminlogin"} onClick={()=>setPath({Inspector:false,Admin:true,User:false})} style={{ textDecoration: 'none' }}>
            <Button >Admin</Button>
          </Link>
        </li>
        <li>
          <Link to={"Userlogin"} onClick={()=>setPath({Inspector:false,Admin:false,User:true})} style={{ textDecoration: 'none' }}>
            <Button >User</Button>
          </Link>
        </li>
      </ul>

      </nav>

      <section className="home-section">
      <Link to={"Adminlogin"} onClick={()=>setPath({Inspector:false,Admin:true,User:false})} style={{ textDecoration: 'none' }}>

        <div>
        <img src={admin}/>
        <h3>Admin</h3>
        </div> </Link>
        <Link to={'Inspectorlogin'} onClick={()=>setPath({Inspector:false,Admin:true,User:false})}   style={{ textDecoration: 'none' }} >
     
        <div>
          <img src={inspector}/>
          <h3>Inspector</h3>
        </div>
        </Link>
        <Link to={"Userlogin"} onClick={()=>setPath({Inspector:false,Admin:false,User:true})} style={{ textDecoration: 'none' }}>

        <div><img src={User}/>
        <h3>User</h3>
        </div></Link>


      </section>
    </div>}>
    
</Route>
  
    { path.Inspector&& <Route path="Inspectorlogin" element={<Inspector/>}/>}
         <Route path="Inspector-dashboard"  
         element={<IProtected Component={IDashboard} />}
         />
      (
      <Route
        path="verifyland"
        element={<IProtected Component={IVerifyland} />}
      />
      <Route
        path="verifyuser"
        element={<IProtected Component={IVerifyuser} />}
      />
      <Route
        path="transferownership"
        element={<IProtected Component={ITransferOwnership} />}
      />

      )




      { path.Admin&& <Route path="Adminlogin" element={<Admin/>}/>
      
      
      
      }

      {
        path.User && <Route path="Userlogin" element={<ULogin/>} />
      }


      <Route path="user-dashboard" element={<UProtected Component={UDashboard} />} />
      <Route
        path="profile"
        element={<UProtected Component={Profile} />}
      />
      <Route
        path="landgallery"
        element={<UProtected Component={ULandGallery} />}
      />
      <Route
        path="myLand"
        element={<UProtected Component={ULandGallery} />}
      />
      <Route
        path="addland"
        element={<UProtected Component={UAddLand} />}
      />
      <Route
        path="registration"
        element={<Registration />}
      />





     <Route path="dashboard" element={<Protected Component={Dashboard} />} />
      
      <Route
        path="alllandinspector" element={<Protected Component={AllLandInspector} />}

      />
      <Route
        path="addlandinspector"
        element={<Protected Component={AddLandInspector} />}
      />



    </Routes>
    </Router>
  );
};

export default App;







