import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import {  ADDING_FRIEND, FRIEND_ADDED, FAILED_ADD_FRIEND } from "../types"; 

export const addFriends = ({ userName, avatar }) => async (dispatch, getState) => {

  const {token, userId} = getState().authReducer; 
  
  dispatch({type: ADDING_FRIEND});

  try {
    const response = await axios.post(
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