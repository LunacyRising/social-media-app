import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { DISLIKE_COMMENT_SUCCESS, DISLIKE_COMMENT_FAILED } from "../types";
import { editKeyValue } from "../../helperFunctions/editKeyValue";
import { removeItem } from "../../helperFunctions/removeItem";

export const dislikeComment = ({ replyComponent, postId, commentId, deleteItem, likes, dislikes }) => async (dispatch,getState) => { 

  const{ token, userId } = getState().authReducer;

  const{ comments, replies } = getState().commentsReducer;
  
  const{ allLikes } = getState().postReducer;  

  let keyValue = { dislikes : dislikes +1 };

  let keyValue2 = { ...keyValue, likes : likes -1}

  console.log(`id de comentario desde el action: ${commentId} removeItem: ${deleteItem}`)

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
        filteredLikes: deleteItem  ? removeItem(allLikes, commentId, "commentId") : allLikes,    
        comments: deleteItem ? editKeyValue(comments, commentId, "_id", keyValue, keyValue2) : editKeyValue(comments, commentId, "_id", keyValue),
        replies : deleteItem && replyComponent ?  editKeyValue(replies, commentId, "_id", keyValue, keyValue2) : editKeyValue(replies, commentId, "_id", keyValue), 
      }
    });
    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode));
    dispatch(snackOpen());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: DISLIKE_COMMENT_FAILED
    });
    dispatch(snackOpen());
  }
};
