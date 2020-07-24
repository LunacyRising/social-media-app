import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { LOGOUT_SUCCESS, LOGGING_OUT, FAIL_LOGOUT } from "../types";
import { editKeyValue } from "../../helperFunctions/editKeyValue"


export const logoutAction = () => async (dispatch,getState) => {

  const { userId } = getState().authReducer;

  const { posts } = getState().postReducer;

  const keyValue = {userIsOnline: false}

  dispatch({type: LOGGING_OUT}); 
  try{
    await axios.post(`http://localhost:5001/logout`,{ userId}); 
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: editKeyValue(posts, userId, "userId", keyValue) 
    })
  }catch(err){
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FAIL_LOGOUT
    });
    errorCode === 500 && dispatch(snackOpen());
  }
}
