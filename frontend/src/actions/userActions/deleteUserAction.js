import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages } from "../messagesActions";

import { DELETE_USER, FAILDELETE_USER, DATA_LOADING } from "../types";

export const deleteUserAction = ({ token, id }) => async dispatch => {
  try{
    dispatch({ type: DATA_LOADING });

    const response = await apiUtil.delete(`/admin/user/${id}`, { headers: { "auth-token": token }});

    dispatch({
      type: DELETE_USER
    });
  }catch(err){
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FAILDELETE_USER
    });
  }
};
