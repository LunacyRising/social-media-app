import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { editKeyValue2 } from "../editKeyValue"; 

import { EDIT_POST_SUCCESS, EDIT_POST_FAIL } from "../types";

export const editPost = ({ editedPost, postId }) => async (dispatch, getState) => {

  const { token } = getState().authReducer;
 
  const { posts } = getState().postReducer;

  try {
    const response = await axios.post(`http://localhost:5001/posts/${postId}/edit`,{ 
      editedPost,
      token
    },
    { 
      headers: { "auth-token": token }
    });
    const id = response.data.finalPost._id;
    
    const edPost = response.data.finalPost.post 

    let keyValue = { post: edPost }
   
    dispatch({
      type: EDIT_POST_SUCCESS, 
      payload: editKeyValue2(posts, id, keyValue )
    });

    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode)); 
    dispatch(snackOpen());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: EDIT_POST_FAIL
    });
  }
};
