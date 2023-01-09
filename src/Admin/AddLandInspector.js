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
import { TransactionContext } from "../StateMangement/Admin"
import { useContext } from "react";

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

    event.preventDefault();
    if( data.get("email") &&
    data.get("address")&&
    data.get("city")&&
     data.get("name")&&
     data.get("age")&&
     data.get('cnic'))
    {const transaction = await contract.addLandInspector(data.get('address'),data.get('name'),data.get('age'), data.get('city'),data.get('email'), { gasLimit: 1000000 });
    await transaction.wait();

    console.log("Transaction is done");

    }
      
     
    //     // let fname="Form Submit Successfully!"
    //   // let cname="toast-success-container"
      
    //     // notify(fname, cname)
      
      
    //   console.log({
    //     email: data.get("email"),
    //     address: data.get("address"),
    //     city:data.get("city"),
    //     name:data.get("name"),
    //     age:data.get("age"),
    //     cnic:data.get('cnic')
     
  
    //   });
    // }
    // else{
       
    //   // let fname="Form is not Complete!"
    //   // let cname="toast-danger-container"
    //   // notify(fname, cname)
    // }
    
    

    // const transaction = await contract.addLandInspector(data.get('address'),data.get('name'),data.get('age'), data.get('city'),data.get('email'), { gasLimit: 10000000 });
    // await transaction.wait();

    // console.log(transaction);
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
            sx={{ mt: 2}}
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
                  autoComplete="given-age"
                  name="age"
                  type="number"
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-Cnic"
                  name="cnic"
                  type="string"
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
                  type="address"
                  id="city"
                  label="City"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
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




