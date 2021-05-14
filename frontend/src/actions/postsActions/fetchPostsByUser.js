import apiUtil from "../../utils/apiUtil/apiUtil";
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL } from "../types";
import { returnMessages } from "../messagesActions";

export const fetchPostsByUser = ({token,userId}) => async dispatch => {
  try{
    const response = await apiUtil.get(`/posts/user/${userId}`, {headers: { "auth-token": token }});

    dispatch({
      type: FETCH_POSTS_SUCCESS,
      payload: {
        postByUser: response.data.posts
      }
    });

  }catch(err){
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FETCH_POSTS_FAIL
    });
  }
};
