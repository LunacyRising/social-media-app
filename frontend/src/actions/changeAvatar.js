import apiUtil from "../utils/apiUtil/apiUtil";
import { returnMessages, snackOpen } from "./messagesActions";
import { CHANGE_AVATAR_SUCESS, CHANGE_AVATAR_FAIL, CHANGING_AVATAR } from "./types"; 
import { editKeyValue } from "../helperFunctions/editKeyValue";

export const changeAvatar = ({ userAvatar }) => async (dispatch,getState) => {
  
  const { userId } = getState().authReducer;

  const { posts } = getState().postReducer;
  
  const { comments, replies } = getState().commentsReducer; 

  dispatch({ type: CHANGING_AVATAR });
  try {
    const response = await apiUtil.post(`/changeAvatar/${userId}`, userAvatar, {headers: { "Content-Type": "multipart/form-data" }});

    const keyValue = { avatar: response.data.avatar } 

    dispatch({
      type: CHANGE_AVATAR_SUCESS,
      payload: {
        avatar: response.data.avatar,
        userId,
        posts: editKeyValue(posts, userId, "userId", keyValue),
        comments: editKeyValue(comments, userId, "userId", keyValue),
        replies: editKeyValue(replies, userId, "userId", keyValue)
      }
    });

    dispatch(snackOpen());

    const messageCode = response.data.code;

    dispatch(returnMessages(messageCode));

  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: CHANGE_AVATAR_FAIL
    });
  }
};
