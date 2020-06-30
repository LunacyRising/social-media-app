import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { LIKE_SUCCESS, LIKE_FAIL, LIKE_LOADING } from "../types";
import { editKeyValue2 } from "../editKeyValue";
import { filterPostsLikesDislikes }  from "../../components/posts/buttons/filterItems"

export const likePost = ({  postId, creatorUserName, title, likes, dislikes, removeItem}) => async (dispatch,getState) => {



  console.log(removeItem, dislikes)

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
        posts: removeItem ? editKeyValue2(posts, postId, keyValue, keyValue2) : editKeyValue2(posts, postId, keyValue), 
        filteredDislikes: removeItem ? filterPostsLikesDislikes(allDislikes, postId) : allDislikes 
      } 
    });
    const message = response.data.message;
    const messageCode = response.data.code;
   // dispatch(returnMessages(messageCode, message));
   // dispatch(snackOpen());
    console.log(response.data.message, response.data.likes);
  } catch (err) {
    console.log(err.response) 
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: LIKE_FAIL
    });
    dispatch(snackOpen());
  }
};
