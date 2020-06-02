import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";

import { EDIT_POST_SUCCESS, EDIT_POST_FAIL, LOADING } from "../types";

export const editPost = ({ token, editedPost, postId }) => async (dispatch, getState) => {

  const { token } = getState().authReducer;

  try {
    let response = await axios.post(`http://localhost:5001/posts/${postId}/edit`,{ 
      editedPost,
      token
    },
    { 
      headers: { "auth-token": token }
    });
    console.log(response.data.finalPost._id)
    dispatch({
      type: EDIT_POST_SUCCESS,
      payload: {
        id: response.data.finalPost._id
      }
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
      type: EDIT_POST_FAIL
    });
  }
};
