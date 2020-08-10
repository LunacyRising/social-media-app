import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { ACCEPT_FRIEND_REQUEST_SUCCESS, ACCEPT_FRIEND_REQUEST_FAILED } from "../types"; 
import { cancelFriendRequest } from "./cancelFriendRequest";

export const acceptFriendRequest = (requestId, requestUserId ) => async (dispatch, getState) => {

  const { token, userId } = getState().authReducer;

  try{ 
    const response = await axios.post(`http://localhost:5001/acceptFriendRequest`,
    {userId,
    requestUserId},
    {
      headers: { "auth-token": token } 
    })
    dispatch({
      type: ACCEPT_FRIEND_REQUEST_SUCCESS,
      payload: response.data.friendLink
    });
    console.log(response)
    //borra la peticion de amistad
    dispatch(cancelFriendRequest(requestId))
  }catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: ACCEPT_FRIEND_REQUEST_FAILED
    });
  }
};
