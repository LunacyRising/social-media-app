import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { LOADING, SUCCESS_COMMENT, FAIL_COMMENT } from "../types"; 

export const createComment = ({
  comment,
  postId,
  postCreator,
  title,
}) => async (dispatch, getState) => {
  const{userId, userName, avatar, token} = getState().authReducer
  dispatch({ type: LOADING });
  try {
    let response = await axios.post(
      `http://localhost:5001/post/${postId}/comments`, 
      {
        userName,
        comment,
        avatar,
        userId,
        postCreator,
        title,
        postId
      },
      {
        headers: { "auth-token": token } 
      }
    );
    dispatch({
      type: SUCCESS_COMMENT,
      payload: response.data.savedComment
    });
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    dispatch(snackOpen());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FAIL_COMMENT
    });
    errorCode === 500 && dispatch(snackOpen());
  }
};
