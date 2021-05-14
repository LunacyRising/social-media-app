import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages, snackOpen } from "../messagesActions";
import {  FAVORITE_ADDED, FAVORITE_FAIL } from "../types"; 

export const createFavorite = (postId) => async (dispatch, getState) => {
  const {token, userId} = getState().authReducer;
  
  try {
    const response = await apiUtil.post(`/favorites`, {postId, userId}, {headers: { "auth-token": token }});

    dispatch({
      type: FAVORITE_ADDED,
      payload: response.data.favorite
    });

    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode));
    dispatch(snackOpen())
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FAVORITE_FAIL
    });
    dispatch(snackOpen());
  }
};
