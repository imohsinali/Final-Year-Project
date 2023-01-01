import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { orange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import abi from '../contract/landregistry.json'
import { ethers } from "ethers";
import {useState,useEffect} from 'react'
import { useDispatch } from "react-redux";
import { SatelliteAlt } from "@mui/icons-material";

export default function Login() {
  // ADMIN_CONTRACT
  let dispatch=useDispatch()

  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const[account,setaccount]=useState('')
    const connectWallect=async ()=>{
      const contractAddress="0xe269268eb73821bEACaBFBB5D5eF40051ed77a1C"
      const contractAbi=abi.abi
  
      try {
        const {ethereum} =window
        if(ethereum)
        {
          const account=await ethereum.request({
            method:"eth_requestAccounts",
          })
          setaccount(account)
        }
        const provider=new ethers.providers.Web3Provider(ethereum)
        const signer=provider.getSigner()
        // const provider1 = new ethers.providers.Web3Provider(web3.currentProvider);
        //  const signer1 = provider1.getSigner();
        // const address = await signer1.getAddress();
      
        //  console.log(address)
        const contract=new ethers.Contract(contractAddress,contractAbi,signer)
        console.log("con",contract)
        setState({provider:provider,signer:signer,contract:contract})
        dispatch({
          type: "ADMIN_CONTRACT",
          payload:{
            contract:contract,
            signer:signer,
            provider:provider
          }
          
        });
      } catch (error) {
        console.log(error)
      }

    }
    let a=state.contract

console.warn(a)
 
    console.log(state)
      const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const privateKey=data.get('key')
    
        // Check if MetaMask is available
        if (window.ethereum) {
          try {
            // Request the user's permission to access their accounts
            const accounts = await window.ethereum.enable();
    
            // Create a new provider instance
            const provider = new ethers.providers.Web3Provider(window.ethereum);
    
            // Create a new wallet instance from the private key
            const wallet = ethers.Wallet.fromPrivateKey(privateKey);
    
            // Connect the wallet to the provider
            const connectedWallet = wallet.connect(provider);
    
            // You can now use the connectedWallet instance to sign transactions and interact with the Ethereum network using MetaMask
          } catch (error) {
            console.error(error);
          }
        } else {
          console.error('MetaMask is not available');
        }
      };
    
        
           

            
    
   const [memos,setMemos]=useState([])
    const {contract}=state
    useEffect(()=>{
        const memosMessage=async()=>{
            const memos=await contract.ReturnAllLandList()
            setMemos(memos)
        }
        contract &&memosMessage()
    },[contract])
            
            console.log("jel", memos)

  const navigate = useNavigate();
  const login = () => {
    localStorage.setItem("Adminlogin", true);

    navigate("/dashboard");
  };
  
  // const handleSubmit = (event) => {
  //   event.preventDefault();

    

    if(account=='0xa91ad5bc6487900b5d5ba28eac7d4bd40db06e76')
    {
      login()
    }

  // else{
    

  // }}


  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });



  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  
  
    
  return (
    <ThemeProvider theme={theme}>
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 4, width: 500, maxWidth: "100%" }}
            
          >
            <Grid container spacing={3}>
              <Grid item xs={12} className="key-input ">
                <TextField
                  name="key"
                  type={values.showPassword ? "text" : "password"}
                  required
                  placeholder="Private key"
                  fullWidth
                  id="key"
                  label="private key"
                  autoFocus
                />

                <IconButton
                  className="icon"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 2, height: "50px" }}
              // onClick={}
            >
              Continue
            </Button>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{
                margin: "1rem 0",

                marginLeft: "25%",
              }}
            >
              Or Click to Connect MetaMask
            </Typography>

            <ColorButton
              fullWidth
              variant="contained"
              sx={{ mb: 2, height: "50px" }}
              onClick={connectWallect}
            >
              MetaMask
            </ColorButton>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}


const theme = createTheme();
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[500]),
  backgroundColor: orange[500],
  "&:hover": {
    backgroundColor: orange[700],
  },
}));