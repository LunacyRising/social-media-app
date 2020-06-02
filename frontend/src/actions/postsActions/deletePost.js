import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";

import { DELETE_POST, FAIL_DELETE_POST, POSTS_LOADING } from "../types";

export const deletePost = ({ postId }) => async (dispatch, getState) => {
  const {token} = getState().authReducer;
  try {
    let response = await axios.delete(`http://localhost:5001/posts/${postId}`, {
      headers: { "auth-token": token }
    });
    dispatch({
      type: DELETE_POST,
      payload: postId 
    });
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    dispatch(snackOpen());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FAIL_DELETE_POST
    });
  }
};
