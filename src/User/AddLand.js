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
import { useDispatch, useSelector } from "react-redux";

const theme = createTheme();

export default function AddLand() {
  let toastId = null;
  let dispatch=    useDispatch()
  const isVerifed    =  useSelector((state)=>state.userReducer.isVerified)

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
  
  const handleSubmit = (event) => {
  
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if( data.get("email") &&
    data.get("district")&&
    data.get("identificationcard")&&
     data.get("name")&&
     data.get("landArea")&&
     data.get('price'))
    {
        dispatch({
          type: "ADD",
          item:{  
              id:1,
      
            name: data.get('name'),
            age: data.get('age'),
            cnic: data.get('identificationcard'),
            city: data.get('district'),
            price:data.get('price'),
            landarea:data.get('landArea')

          },
        });
        let fname="Form Submit Successfully!"
      let cname="toast-success-container"
      
        notify(fname, cname)
      
      
      // console.log({
      //   email: data.get("email"),
      //   address: data.get("address"),
      //   city:data.get("city"),
      //   name:data.get("name"),
      //   age:data.get("age"),
      //   cnic:data.get('cnic')
     
  
      
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
                <TextField
                  required
                  fullWidth
                  id="map"
                  label="Add Location"
                  name="map"
                  autoComplete="map"
                />
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
            { isVerifed?(
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2, }}
              
               
            >
              Submit
            </Button>):(
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2, }}
              disabled
               
            >
              Submit
            </Button>)}
            <ToastContainer/>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
