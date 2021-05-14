import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages, snackOpen } from "../messagesActions";
import { LIKE_SUCCESS, LIKE_FAIL, LIKE_LOADING } from "../types";
import { editKeyValue } from "../../helperFunctions/editKeyValue";
import { removePostsLikesDislikes } from "../../helperFunctions/removePostsLikesDislikes";

export const likePost = ({  postId, creatorUserName, title, likes, dislikes, deleteItem}) => async (dispatch,getState) => {

  const{ token, userId, userName } = getState().authReducer 

  const { posts, allDislikes } = getState(). postReducer; 

  let keyValue = { likes : likes +1 }; 

  let keyValue2 = { ...keyValue, dislikes : dislikes -1}
  
  dispatch({type: LIKE_LOADING})

  try {
    const response = await apiUtil.post(
      `/posts/${postId}/likes`,     
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

  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: LIKE_FAIL
    });
    dispatch(snackOpen());
  }
};
