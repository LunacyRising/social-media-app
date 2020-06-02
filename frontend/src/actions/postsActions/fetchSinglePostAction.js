import axios from "axios";
import { returnMessages } from "../messagesActions";

import { FETCH_POST_SUCCESS, FETCH_POST_FAIL, POSTS_LOADING } from "../types";

/*export const fetchPost = ({ token, postId }) => dispatch => {
  dispatch({ type: POSTS_LOADING });
  axios
    .get(`http://localhost:5001/posts/${postId}`, {
      headers: { "auth-token": token }
    })
    .then(res => {
      dispatch({
        type: FETCH_POST_SUCCESS,
        payload: {
          likes: res.data.likes
        }
      });
      let message = res.data.message;
      let messageCode = res.data.code;
      dispatch(returnMessages(messageCode, message));
      console.log(res);
    })

    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnMessages(errorCode, error));
      dispatch({
        type: FETCH_POST_FAIL
      });
    });
};*/

export const fetchPost = ({ token, postId }) => async dispatch => {
  try {
    dispatch({ type: POSTS_LOADING });
    let response = await axios.get(`http://localhost:5001/posts/${postId}`, {
      headers: { "auth-token": token }
    });
    let data = response.data.post;
    dispatch({
      type: FETCH_POST_SUCCESS,
      payload: {
        user: data
      }
    });
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    console.log(response);
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FETCH_POST_FAIL
    });
  }
};
