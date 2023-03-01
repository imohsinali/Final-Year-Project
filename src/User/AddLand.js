import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TransactionContext } from "../StateMangement/Context";
import { ethers } from "ethers";
import DrawLand from "./DrawLand";
import { Link } from "react-router-dom";

const theme = createTheme();

export default function AddLand() {
    const { contract, currentAccount } = React.useContext(TransactionContext);

  let toastId = null;
  const isVerifed=true;

  function notify(fname,cname) {
    if (!toast.isActive(toastId)) {
      console.log("Displaying Toast");
      toastId = toast(fname, {
        closeOnClick: true,
        toastId: "my_toast",
        autoClose: true,
        closeButton: false,
        position: toast.POSITION.BOTTOM_RIGHT,
        className:cname
      });
    } else {
      console.log("Toast already active");
    }
  }
      // function addLand(uint _area, string memory _address, uint landPrice,string memory _allLatiLongi, uint _propertyPID,string memory _surveyNum, string memory _document) public {
const [profile, setProfile] = React.useState([]);

  React.useEffect(() => {
    const viewProfile = async () => {
      const user = await contract.UserMapping(currentAccount);
      const structuredData = {
        isUserVerified: user.isUserVerified,
      };
      setProfile(structuredData);
    };
    contract && viewProfile();
  }, [contract, currentAccount]);
console.log(profile)
  
  const handleSubmit =async (event) => {
  
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if( data.get("email") &&
    data.get("district")&&
    data.get("identificationcard")&&
     data.get("name")&&
     data.get("landArea")&&
     data.get('price'))
    {

       const transaction = await contract.addLand(
         10000,
         "old bank stop",
         ethers.utils.parseEther('0.001')._hex,
         "1001000",
         10,
         "5",
         "7130149",

         { gasLimit: 1000000 }
       );
       await transaction.wait();

       console.log("Transaction is done");
     

        
        let fname="Form Submit Successfully!"
      let cname="toast-success-container"
      
        notify(fname, cname)
      
     
  
      
    }
    else{
       
      let fname="Form is not Complete!"
      let cname="toast-danger-container"
      notify(fname, cname)
    }
    
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xm" className="landregistration">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Land Registration
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="identificationcard"
                  name="identificationcard"
                  type="number"
                  required
                  fullWidth
                  id="identification card"
                  label="identification card"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="District"
                  name="district"
                  type="string"
                  required
                  fullWidth
                  id="district"
                  label="District"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="Tehsil"
                  name="tehsil"
                  required
                  fullWidth
                  type="address"
                  id="tehsil"
                  label="Tehsil"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="landArea"
                  name="landArea"
                  required
                  fullWidth
                  type="number"
                  id="landArea"
                  label="landArea"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="price"
                  name="price"
                  required
                  fullWidth
                  type="number"
                  id="price"
                  label="price"
                  autoFocus
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="phone"
                  name="tel"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={6}>
                <Link
                  to={'/addlocation'}
                  style={{
                    textDecoration: "none",

                    color: "inherit",
                  }}
                >
                  <Button
                    type="link"
                    fullWidth
                    variant=""
                    sx={{ mt: 1, mb: 2 }}
                  >
                    Add location
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="given-document"
                  name="document"
                  type="file"
                  required
                  fullWidth
                  id="document"
                  autoFocus
                />
              </Grid>
            </Grid>
            {profile.isUserVerified ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Submit
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                disabled
              >
                Submit
              </Button>
            )}

            <ToastContainer />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
