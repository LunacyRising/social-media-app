import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages, snackOpen } from "../messagesActions";
import { editKeyValue } from "../../helperFunctions/editKeyValue";
import { removePostsLikesDislikes } from "../../helperFunctions/removePostsLikesDislikes";

import { DISLIKE_SUCCESS, DISLIKE_FAIL, DISLIKE_LOADING } from "../types";

export const dislikePost = ({ postId, dislikes, likes, deleteItem }) => async (dispatch, getState) => { 

  console.log(deleteItem, likes, dislikes ) 

  let keyValue = { dislikes : dislikes +1 };

  let keyValue2 = { ...keyValue, likes : likes -1} 

  const { userId, token } = getState().authReducer;

  const { posts, allLikes } = getState().postReducer;
 
  dispatch({type: DISLIKE_LOADING})

  try {
    const response = await apiUtil.post(`/posts/${postId}/dislike`, {postId, userId}, { headers: { "auth-token": token }});
    
    dispatch({
      type: DISLIKE_SUCCESS,  
      payload: {
        savedDislike: response.data.savedDislike,
        posts: deleteItem ? editKeyValue(posts, postId, "_id", keyValue, keyValue2) : editKeyValue(posts, postId,"_id", keyValue),  
        filteredLikes: deleteItem ? removePostsLikesDislikes(allLikes, postId) : allLikes    
      } 
    });
    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode));
    dispatch(snackOpen());

  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: DISLIKE_FAIL
    });
    dispatch(snackOpen());
  }
};
