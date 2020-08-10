import axios from "axios";
import { returnMessages } from "../messagesActions";

import { FETCH_POST_SUCCESS, FETCH_POST_FAIL } from "../types";

export const fetchPost = ( postId ) => async dispatch => {
  
  try {
    const response = await axios.get(`http://localhost:5001/posts/${postId}/`);

    const data = response.data;

    dispatch({
      type: FETCH_POST_SUCCESS,
      payload: data
    });

    console.log(response)
    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode));
    console.log(response);
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FETCH_POST_FAIL
    });
  }
};
