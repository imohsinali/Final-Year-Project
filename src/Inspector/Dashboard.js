import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { TransactionContext } from "../StateMangement/Context";
import { useEffect } from "react";
import { useContext } from "react";
export default function Dashboard() {
  const { contract } = useContext(TransactionContext); 
  const [totalUser,setTotalUser]=React.useState(0)
  const [totalProperty, setTotalProperty] = React.useState(0);
  const [totalTranfered, setTotalTranfered] = React.useState(0);


  useEffect(() => {
    const TotalRegistered = async () => {
      const allLand = await contract.ReturnAllLandList();
      const userAddresses = await contract.ReturnAllUserList();
      setTotalUser(userAddresses.length);
      setTotalProperty(allLand.slice(1).length);

    };

    contract && TotalRegistered();
  }, []);

  const myState=1

  const gridSpacing = 3;
  return (
    <Container
    
      maxWidth="100%"
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "Wrap",
                  minHeight: "100px",
                  overflow: "hidden",
                  backgroundColor: "gray",
                }}
              >
                <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Total Users Registerd
              <Typography>
                {totalUser}
              </Typography>
            </Typography>
              </Paper>
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "Wrap",
                  minHeight: "100px",
                  overflow: "hidden",
                  backgroundColor: "gray",
                }}
              >
                <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Total Property Registerd
              <Typography>
                {totalProperty}
              </Typography>
            </Typography>
              </Paper>
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "Wrap",
                      minHeight: "100px",
                      overflow: "hidden",
                      backgroundColor: "gray",
                    }}
                  >
                    <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Total Property Transfered
              <Typography>
                {totalTranfered}
              </Typography>
            </Typography>
                  </Paper>
                </Grid>
               
              </Grid>

    </Container>
  );
}
