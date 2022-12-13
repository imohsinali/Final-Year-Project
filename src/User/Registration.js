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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Registration() {
 let naviagte= useNavigate()
console.warn('i am in cons')
let dispatch=useDispatch()
const handleSubmit = (event) => {

event.preventDefault();
const data = new FormData(event.currentTarget);
if( data.get("email") &&
data.get('cnic')&&
data.get("address")&&
 data.get("name")&&
 data.get("age")&&
 data.get('phone')&&
 data.get('city')&&
 data.get('doc'))
{

  
    dispatch({
      type: "SET_OPTION",
      payload:{
        name:data.get('name'),
        cnic:data.get("cnic"),
        age:data.get("age"),
        address:data.get("address"),
        email:data.get("email"),
        city:data.get('city'),
        phone:data.get('phone'),
        doc:data.get('doc'),
        walletAdress:"0x121218192aasuwieui12"
      }
      
    });
    naviagte('/login')
    // naviagte('/profile')

  }}

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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
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
                  label="Cnic"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="city"
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
                  autoComplete="given-address"
                  name="address"
                  required
                  fullWidth
                  type="address"
                  id="address"
                  label="Address"
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone no"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-document"
                  name="doc"
                  type="file"
                  required
                  fullWidth
                  id="doc"
                  autoFocus
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
