import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import error from "../utils/images/error2.gif";

const ServerDown = () => {
  /////////////////////////////////////////////////////////////
  const useStyles = makeStyles(() => ({
    errorContainer: {
      margin: "20vh auto",
      width: "600px",
      height: " 600px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      animation: "drop 1s ease",
    },
    gif: {
      pointerEvents: "none",
      marginLeft: "14%",
      width: "100%",
      height: "100%",
      boxShadow: "0 7px 4px white"
    },
    messageContainer: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      marginBottom: 20
    },
    message2: {
      paddingTop: 10
    }
  }));
  const classes = useStyles();
  const { errorContainer, gif, messageContainer, message2 } = classes;
  //////////////////////////////////////////////////////////////////
  const { messageCode } = useSelector(state => state.messagesReducer);
  //////////////////////////////////////////////////////////////////
  return messageCode !== 500 ? (
    <Redirect to="/" />
  ) : (
    <>
      <Box className={errorContainer}>
        <Box className={messageContainer}>
          <Typography variant="h4" color="secondary">
            Oops!, something went wrong
          </Typography>
          <Typography className={message2} variant="h6" color="primary">
            please try again in few minutes
          </Typography>
        </Box>
        <Box className={gif}>
        <iframe
          src={error}
          width="100%"
          height="100%"
          title="dragon"
        ></iframe>
        </Box>
      </Box>
    </>
  );
};

export default ServerDown;
