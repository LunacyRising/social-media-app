import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, Paper, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { emailConfirmedAction } from "../actions/authActions/emailConfirmedAction";
import SnackbarMessages from "./SnackbarMessages";

const EmailConfirmation = ({ email }) => {

  const useStyles = makeStyles((theme) => ({

    container: {
      position: "absolute",
      bottom: 0,
      backgroundColor: theme.palette.background.paper,
      animation: "drop 1s ease"
    },
    text: {
      padding: 10
    },
    link: {
      padding: 10
    },
    spinner: {
      marginTop: "10px"
    }
  }));
  const classes = useStyles();
  const { container, spinner, text } = classes;

  const { verificarMail, isLoading } = useSelector(state => state.authReducer);
  
  const dispatch = useDispatch();

  const emailConfirmed = () => {
    setTimeout(() => dispatch(emailConfirmedAction(email)), 2000);
  };

  return !verificarMail ? (
    <>
      <Paper className={container}>
        <Typography className={text} color="primary" variant="h6">Confirm your email</Typography>
        <Typography className={text} variant="body2">
          In order to log in please 
          click on the link bellow to confirm your email
        </Typography>
        <Link 
        href="https://www.google.com/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={emailConfirmed}>
          {email}
        </Link>
        {isLoading && <CircularProgress className={spinner} size={40} />}
      </Paper>
      {<SnackbarMessages />}
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default EmailConfirmation;
