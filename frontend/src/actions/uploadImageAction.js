import axios from "axios";
import { returnMessages, snackOpen } from "./messagesActions";
import { UPLOAD_IMAGE_SUCESS, UPLOAD_IMAGE_FAIL, DATA_LOADING } from "./types";
import { editKeyValueUser } from "./editKeyValue";

export const changeAvatar = ({ userAvatar }) => async (dispatch,getState) => {
  
  const { userId } = getState().authReducer;

  const { posts } = getState().postReducer; 

  dispatch({ type: DATA_LOADING });
  try {
    const response = await axios.post(
      `http://localhost:5001/uploadFileTest/${userId}`,   
      userAvatar, 
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );

    const newAvatar = response.data.result.secure_url; 

    const keyValue = { avatar: newAvatar }

    dispatch({
      type: UPLOAD_IMAGE_SUCESS,
      payload: {
        avatar: newAvatar,
        userId,
        posts: editKeyValueUser(posts, userId, keyValue)
      }
    });
    dispatch(snackOpen());

    let message = response.data.message;

    let messageCode = response.data.code;

    dispatch(returnMessages(messageCode, message));

  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: UPLOAD_IMAGE_FAIL
    });
  }
};
