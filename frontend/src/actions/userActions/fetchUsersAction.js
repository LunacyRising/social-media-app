import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages } from "../messagesActions";
import { GET_USERS, GET_USERSFAIL, DATA_LOADING } from "../types";

export const fetchUsers = ({ token }) => async dispatch => {
  try{
    dispatch({ type: DATA_LOADING });
    const response = await apiUtil.get("/admin/users", { headers: { "auth-token": token } });

    dispatch({
      type: GET_USERS,
      payload: {
        users: response.data.users
      }
    });

    const messageCode = response.data.code;
    dispatch(returnMessages(messageCode))
  }catch(err){
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
        type: GET_USERSFAIL
    });
  }
};
