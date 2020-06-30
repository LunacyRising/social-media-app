import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import {  FRIENDS_LOADING, FRIENDS_LOADED, FAILED_FETCH_FRIENDS } from "../types"; 

export const fetchFriends = () => async (dispatch, getState) => {

  const {token, userId} = getState().authReducer; 
  
  dispatch({type: FRIENDS_LOADING});

  try {
    const response = await axios.get(
      `http://localhost:5001/${userId}/friends`,
      {
        headers: { "auth-token": token } 
      }
    );
    dispatch({
      type: FRIENDS_LOADED,
      payload: response.data.friends
    });
    const message = response.data.message;
    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FAILED_FETCH_FRIENDS
    });
    dispatch(snackOpen());
  }
};