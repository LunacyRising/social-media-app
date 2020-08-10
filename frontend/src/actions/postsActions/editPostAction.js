import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { editKeyValue } from "../../helperFunctions/editKeyValue"; 

import { EDIT_POST_SUCCESS, EDIT_POST_FAIL } from "../types";

export const editPost = (data, postId) => async (dispatch, getState) => {
  
  const { token } = getState().authReducer;
 
  const { posts } = getState().postReducer;

  try {
    const response = await axios.post(`http://localhost:5001/posts/${postId}/edit`,
    data,
    {headers: { "auth-token": token, "Content-Type": "multipart/form-data"}});

    const id = response.data.post._id;
    
    const post = response.data.post

    console.log(response)
   
    dispatch({
      type: EDIT_POST_SUCCESS, 
      payload: editKeyValue(posts, id, "_id", post)
    });

    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode)); 
    dispatch(snackOpen());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: EDIT_POST_FAIL
    });
  }
};
