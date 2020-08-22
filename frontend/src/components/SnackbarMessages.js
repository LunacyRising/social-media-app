import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { snackClose } from "../actions/messagesActions";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar, SnackbarContent } from "@material-ui/core";

const SnackbarMessages = () => {

  const useStyles = makeStyles((theme) => ({

    messageError: {
      display: "flex",
      justifyContent: "center",
      color: "white",
      backgroundColor: theme.palette.error.main
    },
    messageSuccess: {
      display: "flex",
      justifyContent: "center",
      color: "white",
      backgroundColor: theme.palette.success.main
    },
    messageWarning: {
      display: "flex",
      justifyContent: "center",
      color: "white",
      backgroundColor: theme.palette.warning.main
    }
  }));

  const classes = useStyles();
  const { messageError, messageSuccess, messageWarning } = classes;
  ////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const { verifyCaptcha, isAuthenticated } = useSelector(state => state.authReducer);
  const { messageCode, isOpen } = useSelector(state => state.messagesReducer);
  ///////////////////////////////////////////////////////////////////////////

  let text;
  let style;

  switch (messageCode) {
    case 230:
      text = "Account Created!";
      style = messageSuccess;
      break;
    case 231:
      text = "Logged In!";
      style = messageSuccess;
      break;
    case 232:
      text = "Email Confirmed!";
      style = messageSuccess;
      break;
    case 233:
      text = "Profile Updated Successfully!";
      style = messageSuccess;
      break;
    case 234:
      text = "Posted!";
      style = messageSuccess;
      break;
    case 235:
      text = "Avatar Updated Successfully!";
      style = messageSuccess;
      break;
    case 239:
      text = "Like!";
      style = messageSuccess;
      break;
    case 240:
      text = "Dislike!";
      style = messageSuccess;
      break;
    case 250:
      text = "Post Deleted Successfully!";
      style = messageSuccess;
      break;
    case 251:
      text = "Commented!";
      style = messageSuccess;
      break;
    case 252:
      text = "Post Edited!";
      style = messageSuccess; 
      break;
    case 253:
      text = "You cannot like the same post twice!";
      style = messageWarning
      break;
    case 254:
      text = "You cannot dislike the same post twice!";
      style = messageWarning
      break;
    case 255:
      text = "Added to favorites!";
      style = messageSuccess
      break;
    case 256:
      text = "Post already added to favorites!";
      style = messageWarning
      break;
    case 262: 
      text = "Friend request sent!";
      style = messageSuccess
    break;
    case 261: 
      text = "Friend request already sent!";
      style = messageError
    break;
    case 257: 
      text = "Favorite Deleted!";
      style = messageSuccess
      break;
    case 258: 
      text = "Friend Added!";
      style = messageSuccess
      break; 
    case 259: 
      text = "You already added this person to your friend list!";
      style = messageError
      break; 
    case 260: 
      text = "Image added to the gallery!";
      style = messageSuccess
      break; 
    case 464: 
      text = "You are already logged in on a different device/window!";
      style = messageError
      break;  
    case 500:
      text = "Unexpected error, try again later";
      style = messageError;
      break;
    default:
      //return null
  }
  ////////////////////////////////////////////////////////////////////////////////////////
 
  (function () {
    if (!verifyCaptcha && !messageCode) {
      text = "please enter the captcha";
      style = messageError
    } else if (verifyCaptcha && !isAuthenticated && !messageCode) {
      text = "thank you :3";
    }
  })();
  ////////////////////////////////////////////////////////////////////////////////////////
 
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={1500}
        open={isOpen}
        onClose={() => dispatch(snackClose())}
      >
        <SnackbarContent className={style} message={text}></SnackbarContent>
      </Snackbar>
    </>
  );
};

export default SnackbarMessages;
