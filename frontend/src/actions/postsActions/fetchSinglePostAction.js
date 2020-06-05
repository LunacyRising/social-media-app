import axios from "axios";
import { returnMessages } from "../messagesActions";

import { FETCH_POST_SUCCESS, FETCH_POST_FAIL, LOADING } from "../types";

export const fetchPost = ( postId ) => async dispatch => {
  
  dispatch({ type: LOADING });

  try {
    let response = await axios.get(`http://localhost:5001/posts/${postId}/`);

    let data = response.data;

    dispatch({
      type: FETCH_POST_SUCCESS,
      payload: data
    });
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    console.log(response);
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FETCH_POST_FAIL
    });
  }
};
