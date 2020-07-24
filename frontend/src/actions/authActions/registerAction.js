import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import  {registerModalClose } from "../modalsActions/register"
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
    const response = await axios.post("http://localhost:5001/register", {
      name,
      lastName,
      userName,
      email,
      password
    });
    const data = response.data.user.email;
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { email: data }
    });
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode));
    dispatch(registerModalClose())
    pushToEmailConfirm()
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: REGISTER_FAIL
    });
    errorCode === 500 && dispatch(snackOpen());
  }
};
