import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import landList from "./landDetailList";
import { useLocation } from "react-router-dom";
import { TransactionContext } from "../StateMangement/Context";
import { useContext } from "react";


export default function LandGallery() {
  let { pathname } = useLocation();
  // myAllLands;
    const { contract, currentAccount } = useContext(TransactionContext);
    const [inspectors, setInspectors] = React.useState([]);

    React.useEffect(() => {
      const Lands = async () => {
        const allLand = await contract.ReturnAllLandList();
        console.log(allLand)
        for(let i=1;i<allLand.length;i++)
        {
        const Alland = await contract.lands(i);
        console.log(Alland);


        }
         

      };
      contract && Lands();
    }, [contract]);

  console.log(pathname);
  return (
    <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {landList.map((item) => {
          const { img, title, price, date, id } = item;
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
                  <Title className="Land-title">{title}</Title>

                  <img src={img} alt="" className="myLand" />

                  <div className="Land-details">
                    <Typography component="p" variant="h5">
                      Rs:{price}
                    </Typography>
                    <Typography color="text.secondary">{date}</Typography>
                  </div>
                </div>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
