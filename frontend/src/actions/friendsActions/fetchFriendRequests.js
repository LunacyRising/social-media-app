import axios from "axios";
import { returnMessages } from "../messagesActions";
import { FRIEND_REQUESTS_LOADED, FRIEND_REQUESTS_FAILED } from "../types"; 

export const fetchFriendRequests = () => async (dispatch, getState) => {

  const{userId, token} = getState().authReducer;

  try {
    const response = await axios.get(`http://localhost:5001/friendRequests/${userId}`,{
      headers: { "auth-token": token } 
    });
    console.log(response)
    dispatch({
      type: FRIEND_REQUESTS_LOADED,
      payload: response.data
    });
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FRIEND_REQUESTS_FAILED
    });
  }
};