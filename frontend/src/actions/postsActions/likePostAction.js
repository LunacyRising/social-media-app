import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { LIKE_SUCCESS, LIKE_FAIL, LIKE_LOADING } from "../types";
import { editKeyValue } from "../../helperFunctions/editKeyValue";
import { removePostsLikesDislikes } from "../../helperFunctions/removePostsLikesDislikes";

export const likePost = ({  postId, creatorUserName, title, likes, dislikes, deleteItem}) => async (dispatch,getState) => {



  console.log(deleteItem, dislikes)

  const{ token, userId, userName } = getState().authReducer 

  const { posts, allDislikes } = getState(). postReducer; 

  let keyValue = { likes : likes +1 }; 

  let keyValue2 = { ...keyValue, dislikes : dislikes -1}
  
  dispatch({type: LIKE_LOADING})

  try {
    const response = await axios.post(
      `http://localhost:5001/posts/${postId}/likes`,     
      {
        postId,
        userId,
        creatorUserName,
        title,
        userName
      },
      {
        headers: { "auth-token": token }  
      }
    );
    dispatch({
      type: LIKE_SUCCESS, 
      payload: {
        like : response.data.savedLike,
        posts: deleteItem ? editKeyValue(posts, postId, "_id", keyValue, keyValue2) : editKeyValue(posts, postId, "_id", keyValue), 
        filteredDislikes: deleteItem ? removePostsLikesDislikes(allDislikes, postId) : allDislikes 
      } 
    });
    const messageCode = response.data.code;
   // dispatch(returnMessages(messageCode, message));
   // dispatch(snackOpen());
    console.log(response.data.message, response.data.likes);
  } catch (err) {
    console.log(err.response) 
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: LIKE_FAIL
    });
    dispatch(snackOpen());
  }
};
