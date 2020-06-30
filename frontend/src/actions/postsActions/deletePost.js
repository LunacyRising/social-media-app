import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { filterPosts } from "../../components/posts/buttons/filterItems";

import { DELETE_POST, FAIL_DELETE_POST } from "../types";

export const deletePost = ({ postId }) => async (dispatch, getState) => {

  const { token } = getState().authReducer;

  const { posts } = getState().postReducer;

  try {
    const response = await axios.delete(`http://localhost:5001/posts/${postId}`, {
      headers: { "auth-token": token }
    });
    dispatch({
      type: DELETE_POST,
      //payload: postId 
      payload: filterPosts(posts, postId) 
    });
    const message = response.data.message;
    const messageCode = response.data.code;
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
