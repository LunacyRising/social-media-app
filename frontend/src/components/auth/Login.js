import React from "react";
import { useHistory } from "react-router-dom";
import EmailConfirmation from "../EmailConfirmation";
import LoginForm from "./LoginForm";
import { IconButton, Paper, Modal, Zoom, Backdrop} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import violetBackground from "../../utils/images/violetBackground.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {loginModalClose} from "../../actions/modalsActions/login";


const Login = () => {

  const useStyles = makeStyles(() => ({
    
    formContainer: {
      margin: "20vh auto",
      width: "800px",
      height: "500px",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      backgroundImage: `url(${violetBackground})`,
      color: "white",
      "@media(min-width: 320px) and (max-width: 768px)" : {
        width: "100%",
        height: "100%",
        margin: 0,
      },
    },
    closeBtn: {
      position: "absolute",
      top: 0,
      right: 0,
      color: "white"
    },
    input: {
      color: "white"
    },
    buttons: {
      border: "solid 2px #8b70d2",
      marginRight: "5px",
      color: "#8b70d2",
      "&:hover": {
        backgroundColor: "#8b70d2 !important",
        border: "solid 2px white",
        color: "white"
      },
      title: {
        color: "red",
        fontFamily: "Righteous"
      },
      disable: {
        cursor: "not-allowed !important",
        opacity: 0.5,
        backgroundColor: "red"
      },
      modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      closeButton:{
        position: "absolute", 
        top: 0,
        right: 0
      }
    }
  }));
  const classes = useStyles(); 

  const { formContainer, modal,closeBtn} = classes;

  const { isAuthenticated } = useSelector(state => state.authReducer);

  const { messageCode} = useSelector(state => state.messagesReducer);

  const { openLogin } = useSelector(state => state.modalsReducer);
 
  const dispatch = useDispatch();

  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <>
    <Modal 
      className={modal}
      open={openLogin}
      onClose={() => dispatch(loginModalClose())}
      BackdropComponent={Backdrop}
      BackdropProps={{
      timeout: 500,
      }}
      closeAfterTransition>
        <Zoom in={openLogin}>
          <Paper className={formContainer}>
            <IconButton onClick={() => dispatch(loginModalClose())} className={closeBtn}>
              <CloseIcon/>
            </IconButton>
            <LoginForm/>
            {messageCode === 463 && <EmailConfirmation />}
          </Paper>
        </Zoom>
      </Modal>
      {messageCode === 500 && useHistory.push("/error")}
    </>
  );
};

export default React.memo(Login);
