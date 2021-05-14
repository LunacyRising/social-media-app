import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages } from "../messagesActions";
import {  FRIENDS_LOADING, FRIENDS_LOADED, FAILED_FETCH_FRIENDS } from "../types"; 

export const fetchFriends = () => async (dispatch, getState) => {

  const {token, userId} = getState().authReducer; 
  
  dispatch({type: FRIENDS_LOADING});
  try {
    const response = await apiUtil.get(`/${userId}/friends`, {headers: { "auth-token": token }});

    const fLinks = response.data

    const promisesArray = fLinks.map( async fLink => {
      return await apiUtil.get(`/friends/${fLink.friendId}`,{headers: { "auth-token": token }})
    })

    const fss = await Promise.all(promisesArray);

    const friends = fss.map(friend => {
      const { userName, avatar, _id } = friend.data[0]
      return {userName, avatar, friendId: _id }
    });

    dispatch({
      type: FRIENDS_LOADED, 
      payload: friends
    });
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FAILED_FETCH_FRIENDS
    });
  }
};