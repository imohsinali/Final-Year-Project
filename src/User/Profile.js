import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useState ,useEffect} from "react";
import { TransactionContext } from "../StateMangement/Context"
import { useContext } from "react";
  
export default function Profile() {
  const {  contract,currentAccount } = useContext(TransactionContext); 
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const viewProfile = async () => {
      const user = await contract.UserMapping(currentAccount);
      const structuredData = {
          name: user.name,
          age: parseInt(user.age._hex),
          city: user.city,
          cinc:user.cinc,
          email:user.email,
          isUserVerified:user.isUserVerified,
          document:user.document,
          address:user.id

        }


      setProfile(structuredData);
    };
    contract && viewProfile();
  }, [contract,currentAccount])

  const gridSpacing = 2;
  return (
    <Container
      maxWidth="70%"
      sx={{
        mt: 2,
        mb: 4,
      }}
    >
      <Grid container spacing={gridSpacing}>
        <Grid
          item
          xs={12}
          sx={{
            p: 3,
            m: 3,
            ml: 13,
          }}
        >
          <Grid container spacing={gridSpacing}>
            <Grid item lg={3} md={12} sm={5} xs={12}>
              <Paper
                sx={{
                  p: 0,

                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "Wrap",
                  minHeight: "100px",
                  maxWidth: "150px",
                  overflow: "hidden",
                  backgroundColor: "none",
                }}
              >
                <img
                  src="https://image.shutterstock.com/image-vector/businessman-avatar-profile-picture-260nw-221565274.jpg"
                  className="user-image"
                  alt="profile"
                />
              </Paper>
              <Typography sx={{color:profile.isUserVerified?'green':'red',ml:2 }}>Account:{profile.isUserVerified?"Verified":"Not Verified"}</Typography>
            </Grid>

            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={12} xs={12} md={7} lg={12}>
                  <Paper
                    sx={{
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "Wrap",
                      minHeight: "10px",
                      maxWidth: "700px",
                      overflow: "hidden",
                      backgroundColor: "none",
                    }}
                  >
                    <Typography>Wallet Address:</Typography>
                    {profile.address}
                  </Paper>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={12}>
                  <Paper
                    sx={{
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "Wrap",
                      minHeight: "10px",
                      overflow: "hidden",
                      backgroundColor: "none",
                    }}
                  >
                    <Typography>Name:{profile.name} </Typography>
                  </Paper>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={12}>
                  <Paper
                    sx={{
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "Wrap",
                      minHeight: "10px",
                      overflow: "hidden",
                      backgroundColor: "none",
                    }}
                  >
                    <Typography>Age:{profile.age} </Typography>
                  </Paper>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={12}>
                  <Paper
                    sx={{
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "Wrap",
                      minHeight: "10px",
                      overflow: "hidden",
                      backgroundColor: "none",
                    }}
                  >
                    <Typography>CNIC: {profile.cinc}</Typography>
                  </Paper>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={12}>
                  <Paper
                    sx={{
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "Wrap",
                      minHeight: "10px",
                      overflow: "hidden",
                      backgroundColor: "none",
                    }}
                  >
                    <Typography>City:{}</Typography>
                  </Paper>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={12}>
                  <Paper
                    sx={{
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "Wrap",
                      minHeight: "10px",
                      overflow: "hidden",
                      backgroundColor: "none",
                    }}
                  >
                    <Typography>Phone No:{}</Typography>
                  </Paper>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={12}>
                  <Paper
                    sx={{
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "Wrap",
                      minHeight: "10px",
                      overflow: "hidden",
                      backgroundColor: "none",
                    }}
                  >
                    <Typography>Email:{profile.email}</Typography>
                  </Paper>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={12}>
                  <Paper
                    sx={{
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "Wrap",
                      minHeight: "10px",
                      overflow: "hidden",
                      backgroundColor: "none",
                    }}
                  >
                    {/* <div>divDocument:{userProfile.doc}</div> */}
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
