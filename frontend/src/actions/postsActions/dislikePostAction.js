import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { fetchPosts } from "./fetchPostsAction";

import { DISLIKE_SUCCESS, DISLIKE_FAIL } from "../types";

export const dislikePost = ({postId}) => async (dispatch,getState) => {
  const{userId, token} = getState().authReducer
  try {
    let response = await axios.post(
      `http://localhost:5001/posts/${postId}/dislike`,
      {
        postId,
        userId
      },
      {
        headers: { "auth-token": token }
      }
    );
    dispatch({
      type: DISLIKE_SUCCESS
    });
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    dispatch(snackOpen());
    dispatch(fetchPosts());
    console.log(response.data.message, response.data.dislikes);
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: DISLIKE_FAIL
    });
    dispatch(snackOpen());
  }
};
