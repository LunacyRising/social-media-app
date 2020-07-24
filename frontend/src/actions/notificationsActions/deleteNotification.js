import axios from "axios";
import { DELETE_NOTIFICATION, FAIL_DELETE_NOTIFICATION} from "../types";
import { returnMessages } from "../messagesActions";
import { removeItem } from "../../helperFunctions/removeItem";

export const deleteNotification = ({ notificationId }) => async (dispatch, getState) => {

    const{ token } = getState().authReducer;

    const { notifications } = getState().notificationsReducer;
  try { 
    const response = await axios.delete(`http://localhost:5001/notifications/${notificationId}`,{
      headers: { "auth-token": token }  
    });
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: removeItem(notifications, notificationId, "_id")
    });
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FAIL_DELETE_NOTIFICATION
    });
  }
};