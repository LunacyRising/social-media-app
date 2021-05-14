import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages, snackOpen } from "../messagesActions";
import { LOADING, SUCCESS_COMMENT, FAIL_COMMENT } from "../types";
import { editKeyValue } from "../../helperFunctions/editKeyValue"; 

export const createComment = (data, id, number) => async (dispatch, getState) => {
 
  const { token } = getState().authReducer

  const { posts } = getState().postReducer

  const keyValue = {amountOfComments: number + 1}; 

  dispatch({ type: LOADING }); 

  try {
    const response = await apiUtil.post(`/post/${id}/createComment`, data, {headers: { "auth-token": token, "Content-Type": "multipart/form-data" }});

    dispatch({ 
      type: SUCCESS_COMMENT,
      payload: {
        comment: response.data.comment,
        posts: editKeyValue(posts, id, "_id", keyValue)    
      }
    });
    
    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode));
    dispatch(snackOpen());
  }catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FAIL_COMMENT
    });
    errorCode === 500 && dispatch(snackOpen())
  }
};
