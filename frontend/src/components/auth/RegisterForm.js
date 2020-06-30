import React from "react";
import { useForm } from "react-hook-form";
import useCustomForm from "./useCustomForm";
import { useTranslation } from "react-i18next";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../../actions/authActions/registerAction";
import { snackOpen } from "../../actions/messagesActions";
import { clearMessages } from "../../actions/messagesActions";

const RegisterForm = () => {

  const useStyles = makeStyles((theme) => ({
    
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
      border: "solid 2px white",
      marginRight: 15,
      color: "white",
      "&:hover": {
        backgroundColor: theme.palette.primary.main
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

  const { isLoading, verifyCaptcha } = useSelector(state => state.authReducer);

  const { messageCode, message } = useSelector(state => state.messagesReducer);

  const dispatch = useDispatch();

  const { handleSubmit, register,  errors} = useForm();

  const FormDefaultValues = {
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: ""
  };

  const { values, handleChange,  clearError, clearAllErrors } = useCustomForm(FormDefaultValues)

  const { name, lastName, userName, email, password } = values

  const { t } = useTranslation();

  const registerSubmit = () => {
    !verifyCaptcha
      ? dispatch(snackOpen())
      : dispatch(registerAction({ name, lastName, userName, email, password, pushToEmailConfirm }));
  };  
  const pushToEmailConfirm = () => {
    useHistory.push("/emailConfirmation")
  }

  return (
    <>
      <form onSubmit={handleSubmit(registerSubmit)}>
        <Typography className={title} variant="h6">
          {t("RegisterMsg")}
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
            label={t("Name")}
            onChange={handleChange}
            type="text"
            name="name"
            value={values.name}
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
            label={t("LastName")}
            onChange={handleChange}
            type="text"
            name="lastName"
            value={values.lastName}
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
            label={t("UserName")}
            onChange={handleChange}
            type="text"
            name="userName"
            value={values.userName}
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
            label={t("Email")}
            name="email"
            margin="normal"
            value={values.email}
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
            label={t("Password")}
            type="password"
            name="password"
            margin="normal"
            error={errors.password}
            onFocus={() => clearAllErrors()}
            value={values.password}
            helperText={errors?.password?.message}
          />
        </Box>
        <Box className={btnsContainer}>
        <Button color="primary" className={btns} type="submit">
            {(t("Register"))}
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