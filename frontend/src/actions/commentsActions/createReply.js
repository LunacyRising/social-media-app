import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { REPLY_SUCCESS, REPLY_FAILED } from "../types";
import { editKeyValue } from "../../helperFunctions/editKeyValue";

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
        comments: editKeyValue(comments, commentId, "_id", keyValue) 
      }
    });
    console.log(response)
    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode));
    dispatch(snackOpen());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: REPLY_FAILED
    });
    errorCode === 500 && dispatch(snackOpen());
  }
};
