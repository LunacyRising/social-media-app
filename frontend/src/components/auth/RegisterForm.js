import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../../actions/authActions/registerAction";
import { snackOpen } from "../../actions/messagesActions";
import { clearMessages } from "../../actions/messagesActions";

const RegisterForm = ({ openRegister }) => {

  const useStyles = makeStyles(() => ({
    
    textFieldsContainer: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: 30,
    },
    input: {
      color: "white"
    },
    btnsContainer:{
      marginTop: 30,
      marginBottom: 30
    },
    btns: {
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
      textTransform: "capitalize",
      marginTop: 75,
      color: "white"
    }
  }));

  const classes = useStyles();

  const { textFieldsContainer , input, btnsContainer , btns, title } = classes;

  const FormDefaultValues = {
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: ""
  };
  const [formValues, setFormValues] = useState(FormDefaultValues);

  let { name, lastName, userName, email, password } = formValues;

  const handleChange = e => {
    const target = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const { isLoading, verifyCaptcha } = useSelector(state => state.authReducer);

  const { messageCode, message } = useSelector(state => state.messagesReducer);

  const dispatch = useDispatch();

  const clearMessagesDispatch = () => dispatch(clearMessages());

  const { register, handleSubmit, errors, clearError } = useForm();

  const registerSubmit = () => {
    !verifyCaptcha
      ? dispatch(snackOpen())
      : dispatch(registerAction({ name, lastName, userName, email, password, pushToEmailConfirm }));
  };  
  const pushToEmailConfirm = () => {
    useHistory.push("/emailConfirmation")
  }

  const clearAllErrors = () => {
    clearError();
    clearMessagesDispatch();
  };

  return (
    <>
      <form onSubmit={handleSubmit(registerSubmit)}>
        <Typography className={title} variant="h6">
          Register a new account
        </Typography>
        <Box className={textFieldsContainer}>
        <TextField
            inputRef={register({
            required: { value: true, message: "name cannot be empty" },
            minLength: {
                value: 6,
                message: "name must be at least 6 characteres long"
            }
            })}
            InputProps={{
            className: input 
            }}
            InputLabelProps={{
            className: input
            }}
            label="Name"
            onChange={handleChange}
            type="text"
            name="name"
            value={name}
            margin="normal"
            onFocus={() => clearAllErrors()}
            error={messageCode === 461 || errors.name}
            helperText={
            (messageCode === 461 && message) || errors?.name?.message
            }
          />
        <TextField
            inputRef={register({
            required: { value: true, message: "lastname cannot be empty" },
            minLength: {
                value: 6,
                message: "name must be at least 6 characteres long"
            }
            })}
            InputProps={{
            className: input 
            }}
            InputLabelProps={{
            className: input
            }}
            label="Lastname"
            onChange={handleChange}
            type="text"
            name="lastName"
            value={lastName}
            margin="normal"
            onFocus={() => clearAllErrors()}
            error={messageCode === 461 || errors.lastName}
            helperText={
            (messageCode === 461 && message) || errors?.lastName?.message
            }
          />
        <TextField
            inputRef={register({
            required: { value: true, message: "username cannot be empty" },
            minLength: {
                value: 4,
                message: "username must be at least 4 characteres long"
            }
            })}
            InputProps={{
            className: input 
            }}
            InputLabelProps={{
            className: input
            }}
            label="Username"
            onChange={handleChange}
            type="text"
            name="userName"
            value={userName}
            margin="normal"
            onFocus={() => clearAllErrors()}
            error={messageCode === 461 || errors.userName}
            helperText={
            (messageCode === 461 && message) || errors?.userName?.message
            }
          />
        <TextField
            inputRef={register({
            required: { value: true, message: "email cannot be empty" },
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email"
            }
            })}
            InputProps={{
            className: input 
            }}
            InputLabelProps={{
            className: input
            }}
            onChange={handleChange}
            type="email"
            label="Email"
            name="email"
            margin="normal"
            value={email}
            error={messageCode === 460 || errors.email}
            onFocus={() => clearAllErrors()}
            helperText={
            (messageCode === 460 && message) || errors?.email?.message
            }
          />
        <TextField
            inputRef={register({
            required: {
                value: true,
                message: "password cannot be empty"
            },
            minLength: {
                value: 6,
                message: "password must be at least 6 characteres long"
            }
            })}
            InputProps={{
            className: input 
            }}
            InputLabelProps={{
            className: input
            }}
            onChange={handleChange}
            label="Password"
            type="password"
            name="password"
            margin="normal"
            error={errors.password}
            onFocus={() => clearAllErrors()}
            value={password}
            helperText={errors?.password?.message}
          />
        </Box>
        <Box className={btnsContainer}>
        <Button color="primary" className={btns} type="submit">
            Register
            {isLoading && (
            <Box className="spinnerMarginLeft">
                <CircularProgress size={15} />
            </Box>
            )}
        </Button>
        </Box>
      </form>
        {messageCode === 500 && useHistory.push("/error")}
    </>
  );
};

export default RegisterForm;