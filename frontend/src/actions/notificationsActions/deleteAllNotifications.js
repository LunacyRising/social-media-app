import apiUtil from "../../utils/apiUtil/apiUtil";
import { DELETE_ALL_NOTIFICATIONS, FAIL_DELETE_NOTIFICATION} from "../types";
import { returnMessages } from "../messagesActions";


export const deleteAllNotifications = () => async (dispatch, getState) => {
  const{userId, token} = getState().authReducer;

  try { 
    await apiUtil.delete(`/notifications/deleteAll/${userId}`,{headers: { "auth-token": token }});

    dispatch({
      type: DELETE_ALL_NOTIFICATIONS 
    });
    
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FAIL_DELETE_NOTIFICATION
    });
  }
};