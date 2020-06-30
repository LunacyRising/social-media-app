import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { UPLOAD_IMAGE_GALLERY_SUCCESS,  UPLOAD_IMAGE_GALLERY_FAILED, IMAGE_LOADING } from "../types";

export const uploadImage = ({ galleryImage }) => async (dispatch, getState) => { 
  
  const { userName } = getState().authReducer;
  console.log(galleryImage)

  dispatch({ type: IMAGE_LOADING });
  try {
    const response = await axios.post(
      `http://localhost:5001/gallery/upload/${userName}`, 
      galleryImage,
      { headers: { "Content-Type": "multipart/form-data" } }   
    );

    dispatch({
      type: UPLOAD_IMAGE_GALLERY_SUCCESS,
      payload: response.data.data
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
      type: UPLOAD_IMAGE_GALLERY_FAILED
    });
  }
};
