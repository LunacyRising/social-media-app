import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import {  ADDING_FRIEND, FRIEND_ADDED, FAILED_ADD_FRIEND } from "../types"; 

export const addFriends = ({ userName, avatar }) => async (dispatch, getState) => {

  const {token, userId} = getState().authReducer; 
  
  dispatch({type: ADDING_FRIEND});

  try {
    let response = await axios.post(
      `http://localhost:5001/addFriend`,
      {
        userName,
        avatar,
        userId
      },
      {
        headers: { "auth-token": token } 
      }
    );
    dispatch({
      type: FRIEND_ADDED
    });
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    dispatch(snackOpen())
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FAILED_ADD_FRIEND
    });
    dispatch(snackOpen());
  }
};