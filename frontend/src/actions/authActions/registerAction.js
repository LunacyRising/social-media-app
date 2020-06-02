import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import {registerModalClose} from "../modalsActions/register"

/*import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADING } from "./types";

export const registerAction = ({
  name,
  lastName,
  email,
  password,
  props
}) => dispatch => {
  dispatch({ type: USER_LOADING });
  axios
    .post("http://localhost:5001/register", {
      name,
      lastName,
      email,
      password
    })
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { email: res.data.user.email }
      });
      console.log(res);
      props.history.push("/emailConfirmation");
    })
    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnMessages(errorCode, error));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};*/

import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADING } from "../types";

export const registerAction = ({
  name,
  lastName,
  userName,
  email,
  password,
  pushToEmailConfirm
}) => async dispatch => {
  dispatch({ type: USER_LOADING });

  try {
    let response = await axios.post("http://localhost:5001/register", {
      name,
      lastName,
      userName,
      email,
      password
    });
    let data = response.data.user.email;
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { email: data }
    });
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    dispatch(registerModalClose())
    pushToEmailConfirm()
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: REGISTER_FAIL
    });
    errorCode === 500 && dispatch(snackOpen());
  }
};
