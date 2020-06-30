import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { DISLIKE_COMMENT_SUCCESS, DISLIKE_COMMENT_FAILED } from "../types";
import { editKeyValue2 } from "../editKeyValue";
import { filterCommentsLikesDislikes }  from "../../components/posts/buttons/filterItems" 

export const dislikeComment = ({ replyComponent, postId, commentId, removeItem, likes, dislikes }) => async (dispatch,getState) => { 

  const{ token, userId } = getState().authReducer;

  const{ comments, replies } = getState().commentsReducer;
  
  const{ allLikes } = getState().postReducer;  

  let keyValue = { dislikes : dislikes +1 };

  let keyValue2 = { ...keyValue, likes : likes -1}

  console.log(`id de comentario desde el action: ${commentId} removeItem: ${removeItem}`)

  try {
    const response = await axios.post(
      `http://localhost:5001/comments/${commentId}/dislikes`,    

      { userId, postId },

      { headers: { "auth-token": token } }
    );
    console.log(response)
    dispatch({
      type: DISLIKE_COMMENT_SUCCESS, 
      payload: {
        dislike: response.data.savedDislike, 
        filteredLikes: removeItem  ? filterCommentsLikesDislikes(allLikes, commentId) : allLikes,  
        comments: removeItem ? editKeyValue2(comments, commentId, keyValue, keyValue2) : editKeyValue2(comments, commentId, keyValue),
        replies : removeItem && replyComponent ?  editKeyValue2(replies, commentId, keyValue, keyValue2) : editKeyValue2(replies, commentId, keyValue), 
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
      type: DISLIKE_COMMENT_FAILED
    });
    dispatch(snackOpen());
  }
};
