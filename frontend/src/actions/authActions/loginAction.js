import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import {loginModalClose} from "../modalsActions/login"

import { USER_LOADING, LOGIN_SUCCESS, LOGIN_FAIL } from "../types";

export const loginAction = ({ email, password }) => (dispatch, getState) => {

  const { posts } = getState().postReducer;

  dispatch({ type: USER_LOADING });
  axios
    .post("http://localhost:5001/login", {
      email,
      password
    })
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: res.data.token,
          userName: res.data.user.userName,
          role: res.data.user.role,
          amountOfPosts: res.data.user.amountOfPosts,
          userId: res.data.user._id,
          email: res.data.user.email,
          avatar: res.data.user.avatar,
          posts: posts.map(post => post.userId === res.data.user._id ? {...post, userIsOnline: true}: post) 
        }
      });

      dispatch(loginModalClose())

      let message = res.data.message;

      let messageCode = res.data.code;

      dispatch(returnMessages(messageCode, message));

      console.log(res, message, messageCode);

      dispatch(snackOpen());
    })
    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;

      dispatch(returnMessages(errorCode, error));
      
      dispatch({
        type: LOGIN_FAIL
      });
      errorCode === 500 && dispatch(snackOpen());
    });
};

/*export const loginAction = ({ email, password, props }) => async dispatch => {
  try {
    dispatch({ type: USER_LOADING });
    let response = await axios.post("http://localhost:5001/login", {
      email,
      password
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: response.data.token,
        name: response.data.user.name,
        userName: response.data.user.userName,
        role: response.data.user.role,
        id: response.data.user._id,
        email: response.data.user.email
      }
    });
    console.log(response);
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    console.log(response, message, messageCode);
  } catch (err) {
    console.log(err.response);
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: LOGIN_FAIL
    });
  }
};*/
