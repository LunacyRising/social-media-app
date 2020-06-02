import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";


import { CREATE_POST_SUCCESS, CREATE_POST_FAIL,POSTS_LOADING } from "../types";

export const createPost = ({title, post}) => async (dispatch, getState) => {
  const {userName,email,avatar,token,userId, amountOfPosts} = getState().authReducer;
  dispatch({ type: POSTS_LOADING });
  try {
    let response = await axios.post(
      "http://localhost:5001/createPost", 
      {
        userName,
        title,
        email,
        post,
        userId,
        creatorAmountOfPosts: amountOfPosts,
        avatar
      }, 
      {
        headers: { "auth-token": token }
      }
    );
    dispatch({ 
      type: CREATE_POST_SUCCESS,
      payload: response.data.savedPost
    });
    console.log(response.data.savedPost)
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    dispatch(snackOpen());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: CREATE_POST_FAIL
    });
    errorCode === 500 && dispatch(snackOpen());
  }
};
