import apiUtil from "../../utils/apiUtil/apiUtil";
import { GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAIL, NOTIFICATIONS_LOADING} from "../types";
import { returnMessages } from "../messagesActions";


export const getNotifications = () => async (dispatch,getState) => {
  const{userId, token} = getState().authReducer;
  dispatch({type: NOTIFICATIONS_LOADING});
   
  try {
    const response = await apiUtil.get(`/users/${userId}/notifications`,{headers: { "auth-token": token }});
    const data = response.data.notifications;

    dispatch({
      type: GET_NOTIFICATIONS_SUCCESS,
      payload: {
        notifications: data
      }
    });

  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: GET_NOTIFICATIONS_FAIL
    });
  }
};