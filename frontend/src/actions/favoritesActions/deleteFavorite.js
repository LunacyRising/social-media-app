import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import {  FAVORITE_DELETED, FAVORITE_DELETED_FAIL } from "../types"; 
import { removeFavoriteSqueleton } from "../../helperFunctions/removeFavoriteSqueleton";
import { removeFavorite } from "../../helperFunctions/removeFavorite";

export const deleteFavorite = ( favoriteId ) => async (dispatch, getState)=> { 

  const { token, userId } = getState().authReducer;

  const { favoritesSqueleton , favorites } = getState().favoritesReducer;
  try {
    const response = await axios.delete(`http://localhost:5001/favorites/delete/${userId}/${favoriteId}`,
    {
      headers: { "auth-token": token }
    }
    );
    dispatch({
      type: FAVORITE_DELETED,
      payload: {
        squeletons: removeFavoriteSqueleton(favoritesSqueleton, favoriteId),
        favorites: removeFavorite(favorites, favoriteId)
      }
    });
    console.log(favoriteId) 
    const message = response.data.message;
    const messageCode = response.data.code;
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