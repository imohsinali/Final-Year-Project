import { useEffect, useState } from "react";
import React from 'react'
import Home from "./Home";
const App = () => {
let user =localStorage.getItem('path')
console.warn(user)
const [path,setpath]=useState({Inspector:false,Admin:true,User:false})
  useEffect(() => {
  
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
   
      <Home/>
    </>
  )
}

export default App
