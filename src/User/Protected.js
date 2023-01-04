import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
const Protected = ({ Component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("Userlogin");
    if (!login) {
      navigate("login");
    }
  });
  return <Layout co={<Component />} />;
};
// function Login() {
//   const navigate = useNavigate();
//   const login = () => {
//     localStorage.getItem("login", true);
//     navigate("/");
//   };
//   React.useEffect(() => {
//     let login = localStorage.getItem("login");
//     if (login) {
//       navigate("/");
//     }
//   });
//   return (
//     <>
//       <h1>Login page</h1>
//       <button onClick={login}>Login</button>
//     </>
//   );
// }

export default Protected;
