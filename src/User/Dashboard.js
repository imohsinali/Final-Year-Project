import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function Dashboard() {
  const gridSpacing = 3;
  return (
    <Container
      maxWidth="100%"
      sx={{
        mt: 2,
        mb: 4,
      }}
    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "Wrap",
                  minHeight: "228px",
                  overflow: "hidden",
                  backgroundColor: "red",
                }}
              >
                1
              </Paper>
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "Wrap",
                  minHeight: "228px",
                  overflow: "hidden",
                  backgroundColor: "red",
                }}
              >
                1
              </Paper>
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "Wrap",
                      minHeight: "100px",
                      overflow: "hidden",
                      backgroundColor: "red",
                    }}
                  >
                    1
                  </Paper>
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "Wrap",
                      minHeight: "100px",
                      overflow: "hidden",
                      backgroundColor: "red",
                    }}
                  >
                    1
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "Wrap",
                  minHeight: "300px",
                  overflow: "hidden",
                  backgroundColor: "red",
                }}
              >
                1
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "Wrap",
                  minHeight: "300px",
                  overflow: "hidden",
                  backgroundColor: "red",
                }}
              >
                1
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
