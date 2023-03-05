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
import { useNavigate } from "react-router-dom";
import { TransactionContext } from "../StateMangement/Context";

import { useContext} from "react";
import { Input, InputLabel } from "@mui/material";
import axios from "axios";
const theme = createTheme();


  

  
export default function Registration() {
  const { currentAccount, contract } =
    useContext(TransactionContext);
 let naviagte= useNavigate()
console.warn("reg",currentAccount)

const handleSubmit =async (event) => {

event.preventDefault();
const data = new FormData(event.currentTarget);
if (
  data.get("name") &&
  data.get("age") &&
  data.get("cnic") &&
  data.get("city") &&
  data.get("email") &&
  data.get("profilepic") &&
  data.get("doc")
) {
  console.log(
    data.get("name"),
      
      
  );
  const headers = {
      pinata_api_key: `7cef58394b1f0a591f15`,
      pinata_secret_api_key: `54098153be2dc5cc4dc335c06b91cbe1dc5dbae086263a764708f16eeee76ad4

`,
      "Content-Type": "multipart/form-data",
    }

const formData1 = new FormData();
const formData2 = new FormData();

formData1.append("file", data.get("profilepic"));
formData2.append("file", data.get("doc"));


console.log(formData1,formData2);
              

        const profilePic = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data:formData1,
          headers:headers
          
        });
        const profileImage = `ipfs://${profilePic.data.IpfsHash}`;
        const docfile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data:formData2,
          headers:headers
          
        });
        const docfileHash = `ipfs://${docfile.data.IpfsHash}`;
        console.log(docfileHash)
        console.log(
          typeof data.get("name"),
          typeof parseInt(data.get("age")),
          typeof data.get("city"),
          typeof data.get("cnic"),
          typeof docfileHash,
          typeof profileImage,
          typeof data.get("email")
        );

  // function registerUser(string memory _name, uint _age, string memory _city,string memory _cinc, string memory _document, string memory _profilepic, string memory _email

  const transaction = await contract.registerUser(
    data.get("name"),
    parseInt(data.get("age")),
    data.get("city"),
    data.get("cnic"),
    docfileHash,
    profileImage,
    data.get("email"),
    // "Mohsin",
    // 20,
    // "Kochi",
    // "CNC",
    // 'doc',
    // 'prof',
    // 'imohian',
// 

    { gasLimit: 1000000 }
  );

  await transaction.wait();

  console.log("Transaction is done");

  naviagte("/Userlogin");
}}

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
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
          User  Registration
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
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="profilepic">Upload your Pic</InputLabel>

                <TextField
                  autoComplete="profilepic"
                  name="profilepic"
                  type="file"
                  required
                  fullWidth
                  id="profilepic"
                  accept="image/*"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel htmlFor="doc">Upload your Dcouments</InputLabel>

                <TextField
                  autoComplete="userdoc"
                  name="doc"
                  type="file"
                  required
                  fullWidth
                  id="doc"
                  autoFocus
                  accept=".pdf, .doc, .docx"
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
