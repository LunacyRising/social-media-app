import axios from "axios";
import { FETCH_COMMENTS, FETCH_POSTS_FAIL, COMMENTS_LOADING } from "../types";
import { returnMessages } from "../messagesActions";

export const fetchComments = () => async dispatch => {
  dispatch({type: COMMENTS_LOADING})
  try {
    const response = await axios.get(`http://localhost:5001/comments`);
    dispatch({
      type: FETCH_COMMENTS,
      payload: {
        comments: response.data.comments
      }
    });
  } catch (err) {
    const errorCode = err.response ? err.response.data.code : 500;
    const error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FETCH_POSTS_FAIL
    });
  }
};
