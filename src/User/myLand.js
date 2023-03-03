import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import landList from "./landDetailList";
import { TransactionContext } from "../StateMangement/Context";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";


export default function MyLand() {
    const { contract, currentAccount } = useContext(TransactionContext);
    const [user,setUsers]=useState([])
useEffect(() => {
  console.log(currentAccount);
  const Lands = async () => {
    const allLand = await contract.myAllLands(currentAccount);
    console.log(allLand);
    const users = await Promise.all(
      allLand.map(async (landId) => {
        const {
          ownerAddress,
          landAddress,
          physicalSurveyNumber,
          document,
          isLandVerified,
          id,
          isforSell,
        } = await contract.lands(landId);
        return {
          ownerAddress,
          landAddress,
          physicalSurveyNumber,
          document,
          isLandVerified,
          id:parseInt(id._hex),
          isforSell
          // age: parseInt(age._hex),
        };
      })
    );

    setUsers(users);
  };

  contract && Lands();
}, []);
console.log(user);
const sellLand= async(id)=>{
  const bool = await contract.makeItforSell(id);
}
  return (
    <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {user.map((item) => {
          const {
            ownerAddress,
            landAddress,
            physicalSurveyNumber,
            document,
            isLandVerified,
            id,
            isforSell
          } = item;
        
          return (
            <Grid item xs={12} md={4} lg={3} key={id}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "Wrap",
                  minHeight: "300px",
                  overflow: "hidden",
                }}
              >
                <div className="Land-container">
                  {/* <Title className="Land-title">{title}</Title> */}
                  <img
                    src={`https://gateway.pinata.cloud/ipfs/${document.substring(
                      6
                    )}`}
                    alt=""
                    className="myLand"
                  />

                  <div className="Land-details">
                    <Typography component="p" variant="h5">
                      Rs:{physicalSurveyNumber}
                    </Typography>
                    {/* <Typography color="text.secondary">{date}</Typography> */}
                  </div>
                </div>
                <Grid
                  display={"flex"}
                  justifyContent="space-between"
                  alignItems={"center"}
                  gap="4px"
                >
                  {isLandVerified ? (
                    <Button
                      onClick={() => {
                        if (isforSell) {
                          // The land is already on sale
                          alert("The land is already on sale.");
                        } else {
                          // The land is verified and not on sale yet
                          sellLand(id);
                        }
                      }}
                      variant="outlined"
                      color={isforSell ? "secondary" : "primary"}
                    >
                      {isforSell ? "On Sale" : "Make it for Sale"}
                    </Button>
                  ) : (
                    <Button variant="outlined" color="primary" disabled>
                      Verify Land First
                    </Button>
                  )}

                  <Button variant="outlined">Veiw Details</Button>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
