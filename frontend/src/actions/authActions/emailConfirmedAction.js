import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages, snackOpen } from "../messagesActions";
import {MAIL_CONFIRM_SUCCESS, MAIL_CONFIRM_FAILED, WAITING_MAILCONFIRMATION} from "../types";

export const emailConfirmedAction = (email) => async dispatch => {
  dispatch({ type: WAITING_MAILCONFIRMATION });
  try {
    const response = await apiUtil.put(`/${email}`);

    dispatch({
      type: MAIL_CONFIRM_SUCCESS
    });

    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode));
    dispatch(snackOpen());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: MAIL_CONFIRM_FAILED,
      payload: {
        errorCode,
        error
      }
    });
    dispatch(snackOpen());
  }
};
