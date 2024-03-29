import apiUtil from "../../utils/apiUtil/apiUtil";
import { FETCH_COMMENTS, FETCH_POSTS_FAIL, COMMENTS_LOADING } from "../types";
import { returnMessages } from "../messagesActions";

export const fetchComments = () => async dispatch => {
  dispatch({type: COMMENTS_LOADING})
  try {
    const response = await apiUtil.get("/comments");

    dispatch({
      type: FETCH_COMMENTS,
      payload: {
        comments: response.data.comments
      }
    });
    
  } catch (err) {
    const errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FETCH_POSTS_FAIL
    });
  }
};
