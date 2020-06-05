import axios from "axios";
import { FETCH_COMMENTS_BY_POST, FETCH_POSTS_FAIL, COMMENTS_LOADING } from "../types";
import { returnMessages } from "../messagesActions";

export const fetchCommentsByPost = ({ postId, skip, limit }) => async (dispatch) => {

  dispatch({type: COMMENTS_LOADING})
  try {
    let response = await axios.post(`http://localhost:5001/${postId}/comments`,{ skip, limit}); 

    dispatch({
      type: FETCH_COMMENTS_BY_POST,
      payload: {
        comments:  response.data.comments,
        amountOfComments: response.data.amountOfComments 
      } 
    });
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;

    let error = err.response && err.response.data.error;

    dispatch(returnMessages(errorCode, error));

    dispatch({
      type: FETCH_POSTS_FAIL
    });
  }
};
