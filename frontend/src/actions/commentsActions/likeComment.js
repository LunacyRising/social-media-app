import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { LIKE_COMMENT_SUCCESSS, LIKE_COMMENT_FAILED } from "../types";
import { editKeyValue } from "../../helperFunctions/editKeyValue";
import { removeItem } from "../../helperFunctions/removeItem";

export const likeComment = ({ replyComponent, postId, commentId, deleteItem, likes, dislikes }) => async (dispatch,getState) => {  

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
        filteredDislikes: deleteItem ? removeItem(allDislikes, commentId, "commentId") : allDislikes, 
        comments: deleteItem ? editKeyValue(comments, commentId,"_id", keyValue, keyValue2) : editKeyValue(comments, commentId,"_id", keyValue),
        replies : deleteItem && replyComponent ?  editKeyValue(replies, commentId,"_id", keyValue, keyValue2) : editKeyValue(replies, commentId,"_id", keyValue), 
      }
    });
    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode));
    dispatch(snackOpen());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: LIKE_COMMENT_FAILED
    });
    dispatch(snackOpen());
  }
};
