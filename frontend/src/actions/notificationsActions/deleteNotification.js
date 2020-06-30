import axios from "axios";
import { DELETE_NOTIFICATION, FAIL_DELETE_NOTIFICATION} from "../types";
import { returnMessages } from "../messagesActions";


export const deleteNotification = ({ notificationId }) => async (dispatch, getState) => {

    const{ token } = getState().authReducer;

    const { notifications } = getState().notificationsReducer;
  try { 
    const response = await axios.delete(`http://localhost:5001/notifications/${notificationId}`,{
      headers: { "auth-token": token }  
    });
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: notifications.filter(noti =>  noti._id !== notificationId) 
    });
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FAIL_DELETE_NOTIFICATION
    });
  }
};