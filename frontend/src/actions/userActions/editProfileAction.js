import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";

import {
  EDITPROFILE_FAIL,
  PROFILE_UPDATING,
  UPDATE_PROFILE_SUCCESS, 
} from "../types";


export const editProfile = ({values}) => async (dispatch, getState )=> {

  const { token, userId } = getState().authReducer;

  const { posts } = getState().postReducer; 

  const { comments } = getState().commentsReducer; 

  dispatch({ type: PROFILE_UPDATING});
  try { 
    const response = await axios.post(`http://localhost:5001/user/${userId}`,
    { values },
    { headers: { "auth-token": token }}
    );
    const userName = response.data.user.userName;

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: {
        userName,
        userId,
        posts: posts.map(post => post.userId === userId ? {...post, userName }: post),
        comments: comments.map(comment => comment.userId === userId ? {...comment, userName}: comment) 
      }
    });

    dispatch(snackOpen());

    const message = response.data.message;

    const messageCode = response.data.code;

    dispatch(returnMessages(messageCode, message));

  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: EDITPROFILE_FAIL
    });
  }
};
