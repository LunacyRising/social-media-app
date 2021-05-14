import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages, snackOpen } from "../messagesActions";
import { ADDING_FRIEND, FRIEND_ADDED, FAILED_ADD_FRIEND } from "../types"; 

export const addFriends = (friendId) => async (dispatch, getState) => {

  const { token, userId } = getState().authReducer; 
  
  dispatch({type: ADDING_FRIEND});
 
  try {
    const response = await apiUtil.post(`/addFriend`,{friendId, userId}, {headers: { "auth-token": token }});

    dispatch({
      type: FRIEND_ADDED,
      payload: response.data.friend
    });

    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode));
    dispatch(snackOpen())
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FAILED_ADD_FRIEND
    });
    dispatch(snackOpen());
  }
};