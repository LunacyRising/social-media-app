import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages } from "../messagesActions";
import { ACCEPT_FRIEND_REQUEST_SUCCESS, ACCEPT_FRIEND_REQUEST_FAILED } from "../types"; 
import { cancelFriendRequest } from "./cancelFriendRequest";

export const acceptFriendRequest = (requestId, requestUserId ) => async (dispatch, getState) => {

  const { token, userId } = getState().authReducer;

  try{ 
    const response = await apiUtil.post(`/acceptFriendRequest`,{userId, requestUserId}, { headers: { "auth-token": token } });

    dispatch({
      type: ACCEPT_FRIEND_REQUEST_SUCCESS,
      payload: response.data.friendLink
    });

    dispatch(cancelFriendRequest(requestId))
  }catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: ACCEPT_FRIEND_REQUEST_FAILED
    });
  }
};
