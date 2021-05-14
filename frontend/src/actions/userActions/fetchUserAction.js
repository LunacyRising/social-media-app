import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages } from "../messagesActions";
import { GET_USER, GET_USERFAIL, DATA_LOADING } from "../types";

export const fetchUserAction = ({ token, userId }) => async dispatch => {
  try{
    dispatch({ type: DATA_LOADING });
    const response = await apiUtil.get(`/users/user/${userId}`, { headers: { "auth-token": token } });

    dispatch({
      type: GET_USER,
      payload: {
        user: response.data.user
      }
    });

    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode));
  }catch(err){
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: GET_USERFAIL
    });
  };
};
