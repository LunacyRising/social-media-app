import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages, snackOpen } from "../messagesActions";
import { CANCEL_FRIEND_REQUEST_SUCCESS, CANCEL_FRIEND_REQUEST_FAILED } from "../types"; 
import { removeItem } from "../../helperFunctions/removeItem";

export const cancelFriendRequest = (id) => async (dispatch, getState) => {

  const { token } = getState().authReducer;

  const { friendRequests } = getState().friendsReducer;

  try{ 
    const response = await apiUtil.delete(`/cancelFriendRequest/${id}`,{ headers: { "auth-token": token } });

    dispatch({
      type: CANCEL_FRIEND_REQUEST_SUCCESS,
      payload: removeItem(friendRequests, id, "_id")
    });
    
  }catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: CANCEL_FRIEND_REQUEST_FAILED
    });
  }
};
