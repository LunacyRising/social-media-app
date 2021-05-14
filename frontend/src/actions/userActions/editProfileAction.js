import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages, snackOpen } from "../messagesActions";
import { editKeyValue } from "../../helperFunctions/editKeyValue";
import { EDITPROFILE_FAIL, PROFILE_UPDATING, UPDATE_PROFILE_SUCCESS} from "../types";


export const editProfile = ({ values }) => async (dispatch, getState )=> {

  const { token, userId } = getState().authReducer;

  const { posts } = getState().postReducer; 

  const { comments } = getState().commentsReducer; 

  dispatch({ type: PROFILE_UPDATING});
  try { 
    const response = await apiUtil.post(`/user/${userId}`,{ values },{ headers: { "auth-token": token }});
    const userName = response.data.user.userName;
    const keyValue = { userName: userName };

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: {
        userName,
        userId,
        posts : editKeyValue(posts, userId, "userId", keyValue),
        comments: editKeyValue(comments, userId, "userId", keyValue)
      }
    });

    dispatch(snackOpen());

    const messageCode = response.data.code;

    dispatch(returnMessages(messageCode));

  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: EDITPROFILE_FAIL
    });
  }
};
