import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { REPLY_SUCCESS, REPLY_FAILED } from "../types";
import { editKeyValue2 } from "../editKeyValue";

export const createReply = ({ postId, commentId, comment , replies }) => async (dispatch, getState) => {

  const { userId, userName, avatar, token } = getState().authReducer;

  console.log(postId, commentId, comment, replies)

  const { comments } = getState().commentsReducer;  

  let keyValue = { replies: replies +1 };

  try {
    const response = await axios.post(
      `http://localhost:5001/reply`,  
      {
        userName,
        comment,
        avatar,
        userId,
        commentId,
        postId
      },
      {
        headers: { "auth-token": token } 
      }
    );
    dispatch({ 
      type: REPLY_SUCCESS,
      payload: {
        reply: response.data.savedReply,
        comments: editKeyValue2(comments, commentId, keyValue) 
      }
    });
    console.log(response)
    const message = response.data.message;
    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    dispatch(snackOpen());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: REPLY_FAILED
    });
    errorCode === 500 && dispatch(snackOpen());
  }
};
