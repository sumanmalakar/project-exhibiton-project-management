import { Box, Button, Grid, Hidden, InputAdornment, Link, TextField, Typography } from "@mui/material";
import React from "react";
import {makeStyles} from '@mui/styles';
import resoluteailogo from "../../assets/images/resoluteailogo.png";
import Loginlogo from "../../assets/images/Loginlogo.png";
import facegenieLogo from "../../assets/images/facegenieLogo.png";
import LoginWithEmail from "./LoginWithEmail";
import LoginWithGoogle from "./LoginWithGoogle";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Loginlogo})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  formHolder: {
    maxWidth: "390px",
    textAlign: "center",
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.root}>
        <Hidden smDown>
          <Grid item md={6} className={classes.image}></Grid>
        </Hidden>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          container
          direction="column"
          justifyContent="center"
        >
          <Box className={classes.formHolder} mx="auto">
            <img
              src={facegenieLogo}
              alt="Facegenie-logo"
              style={{ width: "60%", height: "auto" }}
            />

            <Box textAlign="center" mt="30px">
              <Typography variant="body1" className={classes.heading}>
                Project Management
              </Typography>

              <LoginWithEmail />
              <LoginWithGoogle />

            <Grid
              mt={5}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography mr={2} style={{ marginTop: "2px" }} variant="body1">
                Product From
              </Typography>

              <img
                src={resoluteailogo}
                alt="Facegenie-logo"
                style={{ width: "50%" }}
              />
            </Grid>
          </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};


