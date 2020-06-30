import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { CREATE_POST_SUCCESS, CREATE_POST_FAIL,POSTS_LOADING } from "../types";

export const createPost = (data) => async (dispatch, getState) => {

  const { token } = getState().authReducer;

  dispatch({ type: POSTS_LOADING });

  try {
    const response = await axios.post(
      "http://localhost:5001/createPost", 
      
        data
      , 
      {
        headers: { "auth-token": token, "Content-Type": "multipart/form-data" } 
      }
    );
    dispatch({ 
      type: CREATE_POST_SUCCESS,
      payload: response.data.savedPost
    });

    console.log(response.data.savedPost)

    const message = response.data.message;

    const messageCode = response.data.code;

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
