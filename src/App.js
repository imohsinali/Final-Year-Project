import Inspector from "./Inspector/Inspector";
import { useEffect, useState } from "react";
import React from 'react'
import User from "./User/User";
import Admin from "./Admin/Admin";
import Home from "./Home";
const App = () => {
  // const [{ basket, user }, dispatch] = useStateValue();
  // console.log("from App", user)
let user =localStorage.getItem('path')
console.warn(user)
const [path,setpath]=useState({Inspector:false,Admin:true,User:false})
  useEffect(() => {
    // window.location.reload();
  
  if(user=='Inspector')
  {
    setpath({Inspector:true,Admin:false,User:false})
  }
  if(user=='Admin')
  {
    setpath({Inspector:false,Admin:true,User:false})
  }if(user=='User')
  {
    setpath({Inspector:false,Admin:false,User:true})
  }
  
    
  },[]);
  return (
    <>
    
     {/* {path.Inspector && <Inspector/> } */}
     {/* {path.User && <User/> } */}
     {/* {path.Admin &&<Admin/>}
      */}
      <Home/>
    </>
  )
}

export default App
