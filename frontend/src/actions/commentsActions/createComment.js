import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { LOADING, SUCCESS_COMMENT, FAIL_COMMENT } from "../types";
import { editKeyValue } from "../../helperFunctions/editKeyValue"; 

export const createComment = ({ comment, postId, postCreator, title, amountOfComments }) => async (dispatch, getState) => {

  const { userId, userName, avatar, token } = getState().authReducer 

  const { posts } = getState().postReducer

  

  let keyValue = {amountOfComments: amountOfComments +1}; 

  dispatch({ type: LOADING }); 
  try {
    const response = await axios.post(
      `http://localhost:5001/post/${postId}/comments`,  
      {
        userName,
        comment,
        avatar,
        userId,
        postCreator,
        title,
        postId
      },
      {
        headers: { "auth-token": token } 
      }
    );
    dispatch({ 
      type: SUCCESS_COMMENT,
      payload: {
        comment: response.data.savedComment,
        posts: editKeyValue(posts, postId, "_id", keyValue)    
      }
    });
    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode));
    dispatch(snackOpen());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FAIL_COMMENT
    });
    errorCode === 500 && dispatch(snackOpen());
  }
};
