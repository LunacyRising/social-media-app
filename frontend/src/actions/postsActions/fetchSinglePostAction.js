import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages } from "../messagesActions";

import { FETCH_POST_SUCCESS, FETCH_POST_FAIL } from "../types";

export const fetchPost = ( postId ) => async dispatch => {
  
  try {
    const response = await apiUtil.get(`/posts/${postId}/`);

    const data = response.data;

    dispatch({
      type: FETCH_POST_SUCCESS,
      payload: data
    });

    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode));

  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FETCH_POST_FAIL
    });
  }
};
