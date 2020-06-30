import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { LIKE_COMMENT_SUCCESSS, LIKE_COMMENT_FAILED } from "../types";
import { editKeyValue2 } from "../editKeyValue";
import { filterCommentsLikesDislikes }  from "../../components/posts/buttons/filterItems"

export const likeComment = ({ replyComponent, postId, commentId, removeItem, likes, dislikes }) => async (dispatch,getState) => {  

  const{ token, userId } = getState().authReducer;

  const{ comments, replies } = getState().commentsReducer;

  const{ allDislikes } = getState().postReducer;

  let keyValue = { likes : likes +1 };

  let keyValue2 = { ...keyValue, dislikes : dislikes -1}; 


  console.log(commentId)
  console.log(postId)

  try {
    const response = await axios.post(
      `http://localhost:5001/comments/${commentId}/likes`, 

      { userId, postId },

      { headers: { "auth-token": token } } 
    );
    console.log(response)
    dispatch({
      type: LIKE_COMMENT_SUCCESSS, 
      payload: {
        like: response.data.savedLike,
        filteredDislikes: removeItem ? filterCommentsLikesDislikes(allDislikes, commentId) : allDislikes, 
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
      type: LIKE_COMMENT_FAILED
    });
    dispatch(snackOpen());
  }
};
