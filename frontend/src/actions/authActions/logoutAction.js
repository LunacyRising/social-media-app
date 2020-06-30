import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { LOGOUT_SUCCESS, LOGING_OUT, FAIL_LOGOUT } from "../types";
import { editKeyValueUser } from "../editKeyValue"


export const logoutAction = () => async (dispatch,getState) => {

  const { userId } = getState().authReducer;

  const { posts } = getState().postReducer;

  const keyValue = {userIsOnline: false}

  dispatch({type: LOGING_OUT}); 
  try{
    await axios.post(`http://localhost:5001/logout`,{ userId}); 
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: editKeyValueUser(posts,userId, keyValue)
    })
  }catch(err){
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FAIL_LOGOUT
    });
    errorCode === 500 && dispatch(snackOpen());
  }
}
