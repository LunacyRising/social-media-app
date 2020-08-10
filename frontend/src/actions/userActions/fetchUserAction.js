import axios from "axios";
import { returnMessages } from "../messagesActions";
import { GET_USER, GET_USERFAIL, DATA_LOADING } from "../types";

export const fetchUserAction = ({ token, userId }) => dispatch => {
  dispatch({ type: DATA_LOADING });
  axios
    .get(`http://localhost:5001/users/user/${userId}`, {
      headers: { "auth-token": token } 
    })
    .then(res => { 
      dispatch({
        type: GET_USER,
        payload: {
          user: res.data.user
        }
      });
      const messageCode = res.data.code;
      dispatch(returnMessages(messageCode));
      console.log(res);
    })

    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      dispatch(returnMessages(errorCode));
      dispatch({
        type: GET_USERFAIL
      });
    });
};

/*export const fetchUserAction = ({ token, id }) => async dispatch => {
  try {
    dispatch({ type: DATA_LOADING });
    let response = await axios.get(`http://localhost:5001/admin/user/${id}`, {
      headers: { "auth-token": token }
    });

    let data = response.data.user;
    dispatch({
      type: GET_USER,
      payload: {
        users: data
      }
    });
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    console.log(res);
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: GET_USERFAIL
    });
  }
};*/
