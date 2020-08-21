import { PENDING_MESSAGE_SUCCESS, PENDING_MESSAGE_DELETED } from "../types";

export const savePendingMessage = (chatMsg) => async (dispatch) => {

  try {
    dispatch({ 
      type: PENDING_MESSAGE_SUCCESS,
      payload: chatMsg
    });
  }catch (err) {
    console.log(err)
  }
};
