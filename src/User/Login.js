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

import { TransactionContext } from "../StateMangement/Admin";

import { useContext,useEffect,useState } from "react";
import { ethers } from 'ethers';


export default function Login() {
  const { connectWallet, currentAccount, transactions,contract ,provider} =
    useContext(TransactionContext);
    const [registered,setRegistered]=useState(false)
  // const {isRegistered}= useSelector((state) => state.userReducer);
  // let provider=contract.provider
console.log('iam provider', provider)
  useEffect(() => {
    const viewInspector = async () => {
      const resgisterduser = await contract.isUserRegistered(currentAccount);
      setRegistered(resgisterduser);
    };
    contract && viewInspector();
  }, [contract])
  const navigate = useNavigate();
  const login = () => {
    localStorage.setItem("Userlogin", true);
    navigate('/profile')
    
  };
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  function handleLogout() {

    provider.enable([]).then(function(accounts) {
      console.log('MetaMask is now logged out');
      setIsLoggedOut(true);
    });

  }
  
    // const [privateKey, setPrivateKey] = useState('');
  
    function handleSubmitP(event) {
      event.preventDefault();
  
      // Add the private key to MetaMask's accounts
      const data = new FormData(event.currentTarget);
      let privateKey=data.get('key')
      console.log(privateKey)
      const account = ethers.Wallet.fromPrivateKey(privateKey);
      window.ethereum.sendAsync({
        method: 'eth_accounts_wallet_add',
        params: [account.signingKey.address]
      }, function(err, added) {
        if (err) {
          console.error(err);
        } else {
          console.log(`Account added: ${added}`);
        }
      });
    }
  
    
  
  const handleSubmit = () => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);

    

    if(currentAccount && !registered)
    {
     console.warn("i am in not")
      navigate("/registration");

    }
    if(currentAccount&&registered)
    {
      // window.location.reload();

      login()

    }

  else{
    

  }}

  

  const [values, setValues] = React.useState({
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
            onSubmit={handleSubmitP}
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
              onClick={()=>{connectWallet(); handleSubmit() }}
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