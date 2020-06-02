import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import {  FAVORITE_ADDED, FAVORITE_FAIL } from "../types"; 

export const createFavorite = ({ postId }) => async (dispatch, getState) => {
  const {token, userId} = getState().authReducer;
  
  try {
    let response = await axios.post(
      `http://localhost:5001/favorites`,
      {
        postId,
        userId
      },
      {
        headers: { "auth-token": token } 
      }
    );
    dispatch({
      type: FAVORITE_ADDED
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
      type: FAVORITE_FAIL
    });
    dispatch(snackOpen());
  }
};
