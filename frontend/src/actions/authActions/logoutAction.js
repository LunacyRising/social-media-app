import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages, snackOpen } from "../messagesActions";
import { LOGOUT_SUCCESS, LOGGING_OUT, FAIL_LOGOUT } from "../types";
import { editKeyValue } from "../../helperFunctions/editKeyValue"
import { emitEvent } from "../../io/emitEvents/emitEvents";

export const logoutAction = () => async (dispatch,getState) => {

  const { userId, userName } = getState().authReducer;

  const { posts } = getState().postReducer;

  const { socket } = getState().ioReducer;

  const keyValue = {userIsOnline: false}

  dispatch({type: LOGGING_OUT}); 
  try{
    await apiUtil.post(`/logout`,{ userId}); 

    dispatch({
      type: LOGOUT_SUCCESS,
      payload: editKeyValue(posts, userId, "userId", keyValue) 
    });
    
    emitEvent("disconect", `${userName} se ha desconectado`, socket);
    socket.off()
  }catch(err){
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FAIL_LOGOUT
    });
    errorCode === 500 && dispatch(snackOpen());
  }
}
