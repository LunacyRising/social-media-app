import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { editKeyValue2 } from "../editKeyValue";
import { filterPostsLikesDislikes }  from "../../components/posts/buttons/filterItems"

import { DISLIKE_SUCCESS, DISLIKE_FAIL, DISLIKE_LOADING } from "../types";

export const dislikePost = ({ postId, dislikes, likes, removeItem }) => async (dispatch, getState) => { 

  console.log(removeItem, likes, dislikes )

  let keyValue = { dislikes : dislikes +1 };

  let keyValue2 = { ...keyValue, likes : likes -1} 

  const { userId, token } = getState().authReducer;

  const { posts, allLikes } = getState().postReducer;

  const testingFilter = filterPostsLikesDislikes(allLikes, postId);

  console.log(testingFilter)
  
  dispatch({type: DISLIKE_LOADING})

  try {
    const response = await axios.post(
      `http://localhost:5001/posts/${postId}/dislike`,  
      {
        postId,
        userId
      },
      {
        headers: { "auth-token": token } 
      }
    );
    dispatch({
      type: DISLIKE_SUCCESS,
      payload: {
        savedDislike: response.data.savedDislike,
        posts: removeItem ? editKeyValue2(posts, postId, keyValue, keyValue2) : editKeyValue2(posts, postId, keyValue),  
        filteredLikes: removeItem ? filterPostsLikesDislikes(allLikes, postId) : allLikes   
      } 
    });
    const message = response.data.message;
    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    dispatch(snackOpen());

  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: DISLIKE_FAIL
    });
    dispatch(snackOpen());
  }
};
