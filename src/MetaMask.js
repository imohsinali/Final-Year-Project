import { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Avatar,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import styled from "@emotion/styled";
import { TransactionContext } from "./StateMangement/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

export default function MetaMask({ path }) {
  const {
    connectWallet,

    currentAccount,
    contract,
    processing,
    setProcessing,
    setIsModalVisible,
  } = useContext(TransactionContext);

  console.log(path);
  const [registeredInspector, setRegisteredInspector] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(false);
  const Adminlogin =
    currentAccount === "0xa91ad5bc6487900b5d5ba28eac7d4bd40db06e76";
  useEffect(() => {
    const viewInspector = async () => {
      const inspector = await contract.isLandInspector(currentAccount);
      const resgisterduser = await contract.isUserRegistered(currentAccount);

      setRegisteredInspector(inspector);
      setRegisteredUser(resgisterduser);
      if (inspector || resgisterduser || Adminlogin) {
        setProcessing(false);
      }
    };
    viewInspector();
  }, [contract]);

  const navigate = useNavigate();
  const login = () => {
    if (path.Inspector && registeredInspector) {
      localStorage.setItem("Inspectorlogin", true);
      localStorage.setItem("Adminlogin", false);
      localStorage.setItem("Userlogin", false);

      navigate("/Inspector-dashboard");
    }
    if (path.Admin && Adminlogin) {
      localStorage.setItem("Adminlogin", true);
      localStorage.setItem("Inspectorlogin", false);
      localStorage.setItem("Userlogin", false);

      navigate("/dashboard");
    }
    if (path.User && registeredUser) {
      localStorage.setItem("Userlogin", true);
      localStorage.setItem("Inspectorlogin", false);
      localStorage.setItem("Adminlogin", false);
      console.log("msohin");
      navigate("/profile");
    }
    if (path.User && !registeredUser) {
      localStorage.setItem("Userlogin", true);
      localStorage.setItem("Inspectorlogin", false);
      localStorage.setItem("Adminlogin", false);
      console.log("msohin");
      navigate("/registration");

    }

    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    connectWallet();

    login();

  };
  const handleLogout = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      }
      );
      await window.ethereum.request({ method: "eth_accounts" });
      await window.ethereum.request({
        method: "wallet_removePermissions",
        params: [{ eth_accounts: {} }],
      });

    } catch (e) {
      console.error(e);
    }
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
            sx={{ mt: 4, width: 500, maxWidth: "100%" }}
          >
            <ColorButton
              fullWidth
              variant="contained"
              sx={{ height: "50px" }}
              onClick={() => {
                handleSubmit();
              }}
            >
              {processing ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Connect MetaMask"
              )}
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
