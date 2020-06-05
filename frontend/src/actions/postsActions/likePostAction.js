import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { LIKE_SUCCESS, LIKE_FAIL } from "../types";

export const likePost = ({  postId, creatorUserName, title}) => async (dispatch,getState) => {
  const{token,userId,userName} = getState().authReducer
  try {
    let response = await axios.post(
      `http://localhost:5001/posts/${postId}/likes`,
      {
        postId,
        userId,
        creatorUserName,
        title,
        userName
      },
      {
        headers: { "auth-token": token } 
      }
    );
    dispatch({
      type: LIKE_SUCCESS
    });
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    dispatch(snackOpen());
    console.log(response.data.message, response.data.likes);
  } catch (err) {
    console.log(err.response) 
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: LIKE_FAIL
    });
    dispatch(snackOpen());
  }
};
