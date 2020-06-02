import React from "react";
import { Typography, Grid, } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const ErrorPage = () => {
  /////////////////////////////////////////////////////////////
  const useStyles = makeStyles(() => ({
    errorContainer: {
      marginTop: "10vh",
      width: "600px",
      height: " 600px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      animation: "drop 1s ease"
    },
    gif: {
      pointerEvents: "none"
    },
    message: {
      marginTop: 50
    }
  }));
  const classes = useStyles();
  const { errorContainer, gif, message } = classes;
  //////////////////////////////////////////////////////////////////
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <div className={errorContainer}>
            <Typography className={message} variant="h3" color="secondary">
              Page does not exist
            </Typography>
            <iframe
              className={gif}
              src="https://giphy.com/gifs/glitch-alphabet-font-3osxY9kuM2NGUfvThe"
              width="480"
              height="318"
              frameBorder="0"
              allowFullScreen
              title="dragon"
            ></iframe>
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </>
  );
};

export default ErrorPage;
