import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages } from "../messagesActions";
import {  GET_FAVORITES, GET_FAVORITES_FAIL, FAVORITES_LOADING } from "../types"; 

export const fetchFavorites = () => async (dispatch, getState) => {
  
  const { token, userId } = getState().authReducer;

  dispatch({ type: FAVORITES_LOADING }); 

  try {
    const response = await apiUtil.get(`/favorites/${userId}`, {headers: { "auth-token": token }});
    const data = response.data;

    const promisesArray = data.map(({ postId }) => {
      return apiUtil.get(`/posts/${postId}/favs`, {headers: { "auth-token": token }})
    });

    const resolvedPromises = await Promise.all(promisesArray);
    const favorites = resolvedPromises.map(fav => fav.data[0]);

    dispatch({
      type: GET_FAVORITES, 
      payload: {favorites}
    });
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: GET_FAVORITES_FAIL
    });
  }
};