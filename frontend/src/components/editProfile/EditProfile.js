import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CSSTransition } from 'react-transition-group' 
import { useForm } from "react-hook-form";
import useCustomForm from "../auth/useCustomForm";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, IconButton, Avatar, Box, Tooltip } from "@material-ui/core";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';
import {CircularProgress} from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';
import SendIcon from '@material-ui/icons/Send';
import UserNameField from "./UserNameField";
import EmailField from "./EmailField";
import SnackbarMessages from "../SnackbarMessages";
import { editProfile } from "../../actions/userActions/editProfileAction";
import { changeAvatar } from "../../actions/uploadImageAction";

const EditProfile = () => {

  const { isAuthenticated , email, userName, avatar, isLoading, avatarLoading } = useSelector(state => state.authReducer);
 
  const useStyles = makeStyles(() => ({
    formContainer: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      justifyContent:"center",
      width: "90%",
      margin: "20vh auto",
      borderRadius: 5,
      animation: "drop 1s ease",
      backgroundImage: "linear-gradient(to top, #86377b 20%, #27273c 80%)", 
      "@media(min-width: 769px)" : {
        width: "70%"
      },
      "@media(min-width: 1025px)" : {
        width: "30%",
        height: 600
      },
    },
    backBtn: {
      position:"absolute",
      top:0,
      left: 0,
    },
    backIcon: {
      color: "white"
    },
    avatarContainer: { 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
      marginTop: 35
    },
    userAvatar: {
      width: 100,
      height: 100
    },
    changeAvatarBtn: {
      color: "white"
    },
    changeAvatarIcon: {
      marginLeft: 5
    },
    userInfoContainer: {
      marginTop: 50
    },
    uniqueFieldContainer: {
      position: "relative",
      width: "90%",
      margin:" 60px auto"
    },
    fieldTitle: {
       position: "absolute",
       left: 0 ,
       top: -23,
       fontSize:12
    },
    uniqueField: {
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      backgroundColor:"#F8F8F8",
      borderRadius: 3
    },
    fieldText: {
      fontSize: 14,
      padding: 7
    },
    paddingRight: {
      paddingRight: 7
    },
    btnContentContainer: {
      display:"flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 5,
      width: "100%"
    },
    submitBtn: {
      width: "90%",
      margin: "auto",
      marginBottom: 30,
      backgroundColor:"#212529",
      pointerEvents: isLoading && "none",
      "&:hover": {
        backgroundColor: "#2c3136 !important"
      }
    }
  }));
  const classes = useStyles();

  const { formContainer, backBtn, backIcon, avatarContainer, userAvatar, changeAvatarBtn, changeAvatarIcon, userInfoContainer, uniqueFieldContainer, uniqueField, fieldText,paddingRight, fieldTitle,submitBtn,btnContentContainer,sendBtnText} = classes;
  

  const { t } = useTranslation();

  const formDefaultValues = {
    editedUserName: userName,
    editedEmail: email
  };

  const { values, setValues, handleChange } = useCustomForm(formDefaultValues);

  const { editedUserName, editedEmail } = values

  const [editUserName, seteditUserName] = useState(false);

  const [editEmail, setEditEmail] = useState(false);

  
  const { messageCode } = useSelector(state => state.messagesReducer);

  const dispatch = useDispatch();

  const history = useHistory();
  
  let emailWord = editEmail ? "Cancel" : "Edit";

  let userWord = editUserName ? "Cancel" : "Edit";

  useEffect(() => {
    setValues({ editedUserName: userName, editedEmail: email });
  }, [userName || email]);
  
  const editProfileDispatch = () => {
    if(!editedUserName || !editedEmail) return;
    dispatch(editProfile({values})); 
    setValues({ editedUserName: "", editedEmail: "" });
    seteditUserName(false);
    setEditEmail(false);
  };

  const { handleSubmit } = useForm();
  
  const changeProfilePic = e => {
    const image = e.target.files[0];
    const userAvatar = new FormData();
    userAvatar.append("userAvatar", image);
    dispatch(changeAvatar({ userAvatar })); 
  };
   const handleAvatarChange = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  return !isAuthenticated ? ( 
    <Redirect to="/" />
  ) : (
    <>
      <Box className={formContainer}>
        <Box className={backBtn}>
          <Tooltip title={t("BackToHomePage")}>
            <IconButton className={backIcon} onClick={() => history.push("/")}>
              <KeyboardBackspaceOutlinedIcon/> 
            </IconButton>
          </Tooltip>
        </Box>
        <form
          enctype="multipart/form-data"
          onSubmit={handleSubmit(editProfileDispatch)}
        >
            <Box className={avatarContainer}>
              <Avatar className={userAvatar} alt="userAvatar" src={avatar}/>
              <Button className={changeAvatarBtn} onClick={handleAvatarChange}>
                <Typography variant="caption">{t("ChangeAvatar")}</Typography>
                <FaceIcon className={changeAvatarIcon}/>
              </Button>
              {avatarLoading && <LinearProgress style={{width:"80%",marginTop: 5}}/>}
            </Box>
            <Box className={userInfoContainer}>
              <Box className={uniqueFieldContainer}>
                  <CSSTransition in={editUserName} timeout={1000} unmountOnExit={true} classNames="updateProfileFields">
                    <UserNameField handleChange={handleChange} editedUserName={editedUserName}/>
                  </CSSTransition>
                  <Typography className={fieldTitle} variant="caption" color="primary">{t("UserName")}</Typography> 
                  <Box className={uniqueField}>
                    <Typography className={fieldText}>{userName}</Typography>
                      <Button onClick={() => seteditUserName(!editUserName)} color="primary">
                        <Typography className={`${fieldText} ${paddingRight }`}>{userWord}</Typography>
                        <PermIdentityIcon />
                      </Button>
                  </Box>
              </Box>
              <Box className={uniqueFieldContainer}>
                  <CSSTransition in={editEmail} timeout={1000} unmountOnExit={true} classNames="updateProfileFields">
                    <EmailField handleChange={handleChange} editedEmail={editedEmail}/>
                  </CSSTransition>
                  <Typography className={fieldTitle} variant="caption" color="primary">{t("Email")}</Typography>
                  <Box className={uniqueField}>
                    <Typography className={fieldText}>{email}</Typography>
                      <Button  onClick={() => setEditEmail(!editEmail)} color="primary">
                        <Typography className={`${fieldText} ${paddingRight }`}>{emailWord}</Typography>
                        <MailOutlineIcon /> 
                      </Button>
                  </Box>
              </Box>
            </Box>
            <Button className={submitBtn} type="submit" color="primary">
                <Box className={btnContentContainer}>
                  <Typography className={sendBtnText} variant="caption">{t("Save")}</Typography>
                  {isLoading ? <CircularProgress size={15}/> : <SendIcon />}
                </Box>
            </Button>
            <input
              name="userAvatar"
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={e => changeProfilePic(e)}
            >
            </input>
        </form>
        </Box>
      {messageCode === 500 && history.push("/error")}
      {<SnackbarMessages />}
    </>
  );
};

export default EditProfile;
