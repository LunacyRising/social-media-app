import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { POST_IMAGE_PREVIEW_SUCCESS, POST_IMAGE_PREVIEW_FAILED } from "../types";

export const postImagePreview = ( data ) => async (dispatch, getState) => { 


  const { token } = getState().authReducer; 
  console.log(data)

  try {
    const response = await axios.post("http://localhost:5001/posts/imagePreview", data, { headers: { "auth-token": token, "Content-Type": "multipart/form-data" } }); 

    dispatch({ 
      type: POST_IMAGE_PREVIEW_SUCCESS,
      payload: response.data.preview
    });

    console.log(response)

    const messageCode = response.data.code;

    dispatch(returnMessages(messageCode));

    dispatch(snackOpen());

  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: POST_IMAGE_PREVIEW_FAILED
    });
    errorCode === 500 && dispatch(snackOpen());
  }
};
