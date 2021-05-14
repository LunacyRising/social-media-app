import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages, snackOpen } from "../messagesActions";
import { REPLY_SUCCESS, REPLY_FAILED } from "../types";
import { editKeyValue } from "../../helperFunctions/editKeyValue";

export const createReply = ({ postId, commentId, comment , replies }) => async (dispatch, getState) => {

  const { userId, userName, avatar, token } = getState().authReducer;

  const { comments } = getState().commentsReducer;  

  let keyValue = { replies: replies +1 };

  try {
    const response = await apiUtil.post(
      "/reply",  
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
