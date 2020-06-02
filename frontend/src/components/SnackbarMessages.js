import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { snackClose } from "../actions/messagesActions";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar, SnackbarContent } from "@material-ui/core";

const SnackbarMessages = () => {
  const useStyles = makeStyles(() => ({
    messageError: {
      display: "flex",
      justifyContent: "center",
      color: "white",
      backgroundColor: "#f44336"
    },
    messageSuccess: {
      display: "flex",
      justifyContent: "center",
      color: "white",
      backgroundColor: "#4caf50"
    },
    messageWarning: {
      display: "flex",
      justifyContent: "center",
      color: "white",
      backgroundColor: "#ff9800"
    },
  }));

  const classes = useStyles();
  const { messageError, messageSuccess, messageWarning } = classes;
  ////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const { verifyCaptcha, isAuthenticated } = useSelector(state => state.authReducer);
  const { messageCode, isOpen } = useSelector(state => state.messagesReducer);
  ///////////////////////////////////////////////////////////////////////////

  let text;
  let color;

  switch (messageCode) {
    case 230:
      text = "Account Created!";
      color = messageSuccess;
      break;
    case 231:
      text = "Logged In!";
      color = messageSuccess;
      break;
    case 232:
      text = "Email Confirmed!";
      color = messageSuccess;
      break;
    case 233:
      text = "Profile Updated Successfully!";
      color = messageSuccess;
      break;
    case 234:
      text = "Posted!";
      color = messageSuccess;
      break;
    case 235:
      text = "Avatar Updated Successfully!";
      color = messageSuccess;
      break;
    case 239:
      text = "Like!";
      color = messageSuccess;
      break;
    case 240:
      text = "Dislike!";
      color = messageSuccess;
      break;
    case 250:
      text = "Post Deleted Successfully!";
      color = messageSuccess;
      break;
    case 251:
      text = "Commented!";
      color = messageSuccess;
      break;
    case 252:
      text = "Post Edited!";
      color = messageSuccess;
      break;
    case 253:
      text = "You cannot like the same post twice!";
      color = messageWarning
      break;
    case 254:
      text = "You cannot dislike the same post twice!";
      color = messageWarning
      break;
    case 255:
      text = "Added to favorites!";
      color = messageSuccess
      break;
    case 256:
      text = "Post already added to favorites!";
      color = messageWarning
      break;
    case 257: 
      text = "Favorite Deleted!";
      color = messageSuccess
      break;
    case 258: 
      text = "Friend Added!";
      color = messageSuccess
      break; 
    case 259: 
      text = "You already added this person to your friend list!";
      color = messageError
      break;   
    case 500:
      text = "Unexpected error, try again later";
      color = messageError;
      break;
    default:
      text = "default msg";
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  let captchaSnack = () => {
    if (!verifyCaptcha && !messageCode) {
      text = "please enter the captcha";
      color = messageError
    } else if (verifyCaptcha && !isAuthenticated) {
      text = "thank you :3";
    }
  };
  captchaSnack();
  ////////////////////////////////////////////////////////////////////////////////////////
 
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={2000}
        open={isOpen}
        onClose={() => dispatch(snackClose())}
      >
        <SnackbarContent className={color} message={text}></SnackbarContent>
      </Snackbar>
    </>
  );
};

export default SnackbarMessages;
