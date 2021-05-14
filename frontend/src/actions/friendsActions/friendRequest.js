import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages, snackOpen } from "../messagesActions";
import { FRIEND_REQUEST_SENDED, FRIEND_REQUEST_FAILED } from "../types"; 

export const friendRequest = (friendId) => async (dispatch, getState) => {
 
  const { token, userId, userName, avatar } = getState().authReducer; 
  
  try {
    const response = await apiUtil.post(`/friendRequest`,
      {
        friendId,
        userId,
        userName,
        avatar 
      },
      {
        headers: { "auth-token": token } 
      }
    );

    dispatch({
      type: FRIEND_REQUEST_SENDED
    });
    
    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode));
    dispatch(snackOpen())
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FRIEND_REQUEST_FAILED
    });
    dispatch(snackOpen());
  }
};