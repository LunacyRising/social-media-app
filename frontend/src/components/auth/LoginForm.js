import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm} from "react-hook-form";
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
import { clearMessages } from "../../actions/messagesActions";
import {registerModalOpen} from "../../actions/modalsActions/register";

const LoginForm = () => {
 
  const useStyles = makeStyles(() => ({
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
      border: "solid 2px #8b70d2",
      marginRight: 15,
      color: "#8b70d2",
      "&:hover": {
        backgroundColor: "#8b70d2 !important",
        border: "solid 2px white",
        color: "white"
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

  const { register, handleSubmit, errors, clearError } = useForm();

  const { isLoading } =  useSelector(state => state.authReducer);

  const { messageCode, message } = useSelector(state => state.messagesReducer);

  const { openLogin } = useSelector(state => state.modalsReducer);

  const dispatch = useDispatch();

  const loginDispatch = () => dispatch(loginAction({ email, password }));

  const clearMessagesDispatch = () => dispatch(clearMessages());

  const formDefaultValues = {
    email: "",
    password: ""
  };
  const [formValues, setFormValues] = useState(formDefaultValues);

  const { email, password } = formValues;
  
  const handleChange = e => {
    const target = e.target;
    setFormValues(prevState => ({
      ...prevState, 
      [target.name]: target.value
    }));
  };
  ////////////////////////////////////////////////////////////
  const clearAllErrors = () => {
    clearError();
    clearMessagesDispatch();
  };
  /////////////////////////////////////////////////////////////////
  return ( 
    <>
        <form onSubmit={handleSubmit(loginDispatch)}>
          <Typography variant="h6">
            Login to your account
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
              label="Email"
              placeholder="Enter your email"
              type="email"
              name="email"
              onFocus={errors ? () => clearAllErrors() : null}
              error={messageCode === 462 || errors.email}
              helperText={
                (messageCode === 462 && message) || errors?.email?.message
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
              label="Password"
              onChange={handleChange}
              onFocus={errors ? () => clearAllErrors() : null}
              error={messageCode === 462 || errors.password}
              type="password"
              name="password"
              helperText={
                (messageCode === 462 && message) || errors?.password?.message
              }
              margin="normal"
              value={password}
            ></TextField>
           </Box> 
          <Box className={btnsContainer}>
            <Button className={btn} type="submit">
              Log In
              {isLoading && <CircularProgress size={15}/>}
            </Button>
            <Button onClick={() => dispatch(registerModalOpen())} className={btn}> 
              Register
            </Button>
          </Box>
        </form>
      {messageCode === 500 && useHistory.push("/error")}
    </>
  );
};


export default LoginForm;
