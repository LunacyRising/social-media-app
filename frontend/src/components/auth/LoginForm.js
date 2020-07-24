import React from "react";
import { useHistory } from "react-router-dom";
import useCustomForm from "./useCustomForm";
import { useTranslation } from "react-i18next";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment, 
} from "@material-ui/core";
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../actions/authActions/loginAction";
import {registerModalOpen} from "../../actions/modalsActions/register";

const LoginForm = () => {
 
  const useStyles = makeStyles((theme) => ({
    closeBtn: {
      position: "absolute",
      top: 0,
      right: 0,
      color: "white" 
    },
    textFieldsContainer: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: 30,
    },
    input: {
      color: "white"
    },
    btnsContainer: {
      marginTop: 30
    },
    btn: {
      border: "solid 2px white",
      marginRight: 15,
      color: "white",
      "&:hover": {
        backgroundColor: theme.palette.primary.main
      },
    disable: {
      cursor: "not-allowed !important",
      opacity: 0.5,
      backgroundColor: "red"
    },
  }
  }));
  const classes = useStyles();

  const { textFieldsContainer, input, btnsContainer, btn } = classes;

  const { t } = useTranslation();

  const { isLoading } =  useSelector(state => state.authReducer); 

  const { messageCode } = useSelector(state => state.messagesReducer);

  const dispatch = useDispatch();

  const formDefaultValues = {  
    email: "",
    password: ""
  };

  const { values, handleChange, register, handleSubmit, errors, clearAllErrors } = useCustomForm(formDefaultValues)

  const { password, email } = values

  return ( 
    <>
        <form onSubmit={handleSubmit(() => dispatch(loginAction({ email , password})))}> 
          <Typography variant="h6">
            {t("LoginMsg")}
          </Typography>
          <Box className={textFieldsContainer}>
            <TextField
              color="secondary"
              inputRef={register({
                required: { value: true, message: "email cannot be empty" }
              })}
              InputProps={{
                className: input,
                endAdornment:<InputAdornment position="end"><EmailOutlinedIcon/></InputAdornment>
              }}
              InputLabelProps={{
                className: input    
              }}
              onChange={handleChange}
              label={t("Email")}
              placeholder="Enter your email"
              type="email"
              name="email"
              onFocus={errors ? () => clearAllErrors() : null}
              error={messageCode === 462 || errors.email}
              helperText={
                (messageCode === 462 && "invalid email or password") || errors?.email?.message
              }
              margin="normal"
              value={email}
            ></TextField>
            <TextField
              color="secondary"
              inputRef={register({
                required: { value: true, message: "password cannot be empty" }
              })}
              InputProps={{
                className: input,
                endAdornment:<InputAdornment position="end"><LockOutlinedIcon/></InputAdornment> 
              }}
              InputLabelProps={{
                className: input
              }}
              label={t("Password")}
              onChange={handleChange}
              onFocus={errors ? () => clearAllErrors() : null}
              error={messageCode === 462 || errors.password}
              type="password"
              name="password"
              helperText={
                (messageCode === 462 && "invalid email or password") || errors?.password?.message
              }
              margin="normal"
              value={password}
            ></TextField>
           </Box> 
          <Box className={btnsContainer}>
            <Button className={btn} type="submit">
              {t("Login")}
              {isLoading && <CircularProgress size={15}/>}
            </Button>
            <Button onClick={() => dispatch(registerModalOpen())} className={btn}> 
            {t("Register")}
            </Button>
          </Box>
        </form>
      {messageCode === 500 && useHistory.push("/error")}
    </>
  );
};


export default LoginForm;
