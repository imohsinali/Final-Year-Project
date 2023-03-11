import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TransactionContext } from "../StateMangement/Context"
import { useContext } from "react";
import { ethers } from "ethers";

const theme = createTheme();

export default function AddLandInspector() {

  const { contract } = useContext(TransactionContext);

  


  // let toastId = null;
  
  // function notify(fname,cname) {
  //   if (!toast.isActive(toastId)) {
  //     console.log("Displaying Toast");
  //     toastId = toast(fname, {
  //       closeOnClick: true,
  //       toastId: "my_toast",
  //       autoClose: true,
  //       closeButton: false,
  //       position: toast.POSITION.BOTTOM_RIGHT,
  //       className:cname
  //     });
  //   } else {
  //     console.log("Toast already active");
  //   }
  // }

  const handleSubmit  = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
console.log(
  data.get("address"),
  data.get("name"),
  data.get("dob") ,
    data.get("cnic") ,
    data.get("city") ,
    data.get("_designation")
);
    event.preventDefault();
    if (
      data.get("address") &&
      data.get("name") &&
      data.get("dob") &&
      data.get("cnic") &&
      data.get("city") &&
      data.get("_designation")
    ) {
      // function addLandInspector(address _addr, bytes32 _name, bytes32 _dob, uint _cinc, bytes32 _designation, bytes32 _city) public returns (bool) {

      const transaction = await contract.addLandInspector(
        data.get("address"),

        ethers.utils.formatBytes32String(data.get("name")),
        ethers.utils.formatBytes32String(data.get("dob")),
        data.get("cnic"),
        ethers.utils.formatBytes32String(data.get("_designation")),
        ethers.utils.formatBytes32String(data.get("city")),
        { gasLimit: 1000000 }
      );
      await transaction.wait();

      console.log("Transaction is done");
    }
      
     
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            Add Land Inspector
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-address"
                  type="string"
                  name="address"
                  required
                  fullWidth
                  id="address"
                  label="Adress"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-dob"
                  name="dob"
                  type="string"
                  required
                  fullWidth
                  id="dob"
                  label="Dath of Brith"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-Cnic"
                  name="cnic"
                  type="number"
                  required
                  fullWidth
                  id="cinc"
                  label="CNIC"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-city"
                  name="city"
                  required
                  fullWidth
                  type="string"
                  id="city"
                  label="City"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-designation"
                  name="_designation"
                  required
                  fullWidth
                  type="string"
                  id="_designation"
                  label="_designation"
                  autoFocus
                />
              </Grid>

              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Submit
            </Button>
            <div>
              <ToastContainer />
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}




