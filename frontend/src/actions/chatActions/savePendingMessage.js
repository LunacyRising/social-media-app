import { PENDING_MESSAGE_SUCCESS } from "../types";

export const savePendingMessage = (chatMsg) => async (dispatch) => {

    dispatch({ 
      type: PENDING_MESSAGE_SUCCESS,
      payload: chatMsg
    });
};
