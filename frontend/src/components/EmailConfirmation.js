import React from "react";
import { CircularProgress, Paper,Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { emailConfirmedAction } from "../actions/authActions/emailConfirmedAction";
import SnackbarMessages from "./SnackbarMessages";

const EmailConfirmation = props => {
  /////////////////////////////////////////////////////////////
  const useStyles = makeStyles(() => ({
    formContainer: {
      margin: "auto",
      width: 350,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      animation: "drop 1s ease"
    },
    title: {
      padding: 10
    },
    spinner: {
      marginTop: "10px"
    }
  }));
  const classes = useStyles();
  const { formContainer, spinner,title } = classes;
  /////////////////////////////////////////////////////////////////////
  //const { messageCode } = useSelector(state => state.messagesReducer);
  const { verificarMail, isLoading, email,verifyCaptcha } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  //////////////////////////////////////////////////////////////////////////////
  const emailConfirmed = () => {
    setTimeout(() => dispatch(emailConfirmedAction(email)), 2000);
  };
  return !verificarMail && verifyCaptcha? (
    <>
      <Paper className={formContainer}>
        <Typography className={title} color="primary" variant="h6">Confirm your email</Typography>
        <a
          onClick={emailConfirmed}
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
          In order to log in please 
          click on the link bellow to confirm your email <a
          onClick={emailConfirmed}
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {email}
        </a>
        {isLoading && <CircularProgress className={spinner} size={40} />}
      </Paper>
      {<SnackbarMessages />}
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default EmailConfirmation;
