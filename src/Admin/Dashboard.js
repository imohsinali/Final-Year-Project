import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
export default function Dashboard() {
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
                200
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
                100000
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
                30
              </Typography>
            </Typography>
                  </Paper>
                </Grid>
               
              </Grid>

    </Container>
  );
}
