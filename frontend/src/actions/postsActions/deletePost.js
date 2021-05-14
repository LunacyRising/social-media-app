import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages, snackOpen } from "../messagesActions";
import { removeItem } from "../../helperFunctions/removeItem";

import { DELETE_POST, FAIL_DELETE_POST } from "../types";

export const deletePost = ({ postId }) => async (dispatch, getState) => {

  const { token } = getState().authReducer;

  const { posts } = getState().postReducer;

  try {
    const response = await apiUtil.delete(`/posts/${postId}`, {headers: { "auth-token": token }});

    dispatch({
      type: DELETE_POST,
      payload: removeItem(posts, postId,"_id") 
    });
    
    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode));
    dispatch(snackOpen());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FAIL_DELETE_POST
    });
  }
};
