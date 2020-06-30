import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";

import { EDIT_USER, EDITUSER_FAIL, DATA_LOADING } from "../types";

export const editUser = ({
  token,
  name,
  email,
  role,
  id
}) => async dispatch => {
  dispatch({ type: DATA_LOADING });
  try {
    let response = await axios.patch(
      `http://localhost:5001/admin/user/${id}`,
      {
        name,
        email,
        role
      },
      {
        headers: { "auth-token": token }
      }
    );
    let data = response.data.updatedUser;
    dispatch({
      type: EDIT_USER
    });
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    console.log(message, messageCode);
    dispatch(snackOpen());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: EDITUSER_FAIL
    });
  }
};
