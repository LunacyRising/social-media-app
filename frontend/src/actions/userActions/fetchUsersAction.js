import axios from "axios";
import { returnMessages } from "../messagesActions";

import { GET_USERS, GET_USERSFAIL, DATA_LOADING } from "../types";

export const fetchUsers = ({ token }) => dispatch => {
  dispatch({ type: DATA_LOADING });
  axios
    .get("http://localhost:5001/admin/users", {
      headers: { "auth-token": token }
    })
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: {
          users: res.data.users
        }
      });
      let message = res.data.message;
      let messageCode = res.data.code;
      dispatch(returnMessages(messageCode, message));
      console.log(res, message, messageCode, res.data.users);
    })

    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnMessages(errorCode, error));
      dispatch({
        type: GET_USERSFAIL
      });
    });
};

/*export const fetchUsers = ({ token }) => async dispatch => {
  dispatch({ type: DATA_LOADING });
  try {
    let response = await axios.get("http://localhost:5001/admin/users", {
      headers: { "auth-token": token }
    });
    let data = response.data.users;
    console.log(response);
    dispatch({
      type: GET_USERS,
      payload: {
        users: data
      }
    });
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: GET_USERSFAIL
    });
  }
};*/
