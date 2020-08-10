import React from "react";
import CloseIcon from '@material-ui/icons/Close';
import violetBackground from "../../utils/images/violetBackground.jpg";
import RegisterForm from "./RegisterForm";
import Captcha from "./Captcha";
import {
  IconButton,
  Paper,
  Modal,
  Backdrop,
  Zoom 
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {registerModalClose} from "../../actions/modalsActions/register";

const Register = () => {

  const useStyles = makeStyles(() => ({
    
    formContainer: {
      margin: "20vh auto",
      width: "800px",
      height: "auto",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      backgroundImage: `url(${violetBackground})`,
      "@media(min-width: 320px) and (max-width: 768px)" : {
        width: "100%",
        height: "100%"
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
      }
    },
    title: {
      fontFamily: "Righteous",
      textTransform: "capitalize",
      paddingTop: 20
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));
  const classes = useStyles();

  const { formContainer, modal, closeBtn } = classes;

  const { isAuthenticated } = useSelector(state => state.authReducer); 

  const { messageCode } = useSelector(state => state.messagesReducer);

  const { openRegister } = useSelector(state => state.modalsReducer);

  const dispatch = useDispatch();

  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <>
    <Modal className={modal}
      open={openRegister}
      onClose={() => dispatch(registerModalClose())}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
      timeout: 500,
      }}
      >
        <Zoom in={openRegister}>
          <Paper className={formContainer}>
            <IconButton onClick={() => dispatch(registerModalClose())} className={closeBtn}>
                <CloseIcon/>
            </IconButton>
            <RegisterForm/>
            <Captcha/>
          </Paper>
        </Zoom>
      </Modal>
      {messageCode === 500 && useHistory.push("/error")}
    </>
  );
};

export default React.memo(Register);
