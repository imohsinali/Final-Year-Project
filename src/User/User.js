import Registration from "./Registration";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import LandGallery from "./LandGallery";
import Protected from "./Protected";
function User() {
  const login =localStorage.getItem("login")
  // let login= false
  
  return (
    <Router>
      <Routes>
      
     <Route path="/login" element={<Login />} />
      <Route path="dashboard" element={<Protected Component={Dashboard} />} />
      <Route
        path="profile"
        element={<Protected Component={Registration} />}
      />
      <Route
        path="landgallery"
        element={<Protected Component={LandGallery} />}
      />
      <Route
        path="myLand"
        element={<Protected Component={LandGallery} />}
      />

    </Routes>
      
    </Router>
  );
}

export default User;
