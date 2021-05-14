import apiUtil from "../../utils/apiUtil/apiUtil";
import { FETCH_COMMENTS_BY_POST, FETCH_POSTS_FAIL, COMMENTS_LOADING } from "../types";
import { returnMessages } from "../messagesActions";

export const fetchCommentsByPost = ({ postId, skip, limit }) => async (dispatch, getState) => {

  const { amountOfComments } = getState().postReducer;

  dispatch({type: COMMENTS_LOADING})

  try {
    const response = await apiUtil.post(`/${postId}/comments`,{ skip, limit});  

    dispatch({
      type: FETCH_COMMENTS_BY_POST,
      payload: {
        comments:  response.data.comments,
        amountOfComments: amountOfComments + response.data.amountOfComments 
      } 
    });
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FETCH_POSTS_FAIL
    });
  }
};
