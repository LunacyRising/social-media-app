import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import {  FAVORITE_DELETED, FAVORITE_DELETED_FAIL } from "../types"; 

export const deleteFavorite = ({favoriteId}) => async (dispatch, getState)=> {
  const {token, userId} = getState().authReducer;
  try {
    let response = await axios.delete(`http://localhost:5001/favorites/delete/${userId}/${favoriteId}`,
    {
      headers: { "auth-token": token }
    }
    );
    dispatch({
      type: FAVORITE_DELETED,
      payload: favoriteId
    });
    console.log(favoriteId)
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    dispatch(snackOpen())
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FAVORITE_DELETED_FAIL
    });
    dispatch(snackOpen());
  }
};