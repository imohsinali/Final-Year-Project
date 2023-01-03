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
import { useState } from "react";
import { TransactionContext } from "../StateMangement/Admin";

import { useContext } from "react";

export default function Admin() {
  const { connectWallet, currentAccount, transactions } =
    useContext(TransactionContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const login = () => {
    localStorage.setItem("Adminlogin", true);

    navigate("/dashboard");
  };

  if (currentAccount == "0xa91ad5bc6487900b5d5ba28eac7d4bd40db06e76") {
    login();
  }

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
              onClick={connectWallet}
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
