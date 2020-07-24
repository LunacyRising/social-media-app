import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import {  FAVORITE_DELETED, FAVORITE_DELETED_FAIL } from "../types"; 
import { removeItem } from "../../helperFunctions/removeItem";

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
        squeletons: removeItem(favoritesSqueleton, favoriteId,"postId"),
        favorites: removeItem(favorites, favoriteId,"_id") 
      }
    });
    console.log(favoriteId) 
    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode));
    dispatch(snackOpen())
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FAVORITE_DELETED_FAIL
    });
    dispatch(snackOpen());
  }
};