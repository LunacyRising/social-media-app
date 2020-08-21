import { SAVE_MESSAGE_SUCCESS } from "../types";
import { savePendingMessage } from "./savePendingMessage";

export const saveMessages = (chatMsg) => async (dispatch, getState) => {
  
  const { chatBoxes } = getState().chatReducer;

  const boxExists = chatBoxes.some(item => item.id === chatMsg.senderId);

  dispatch({ 
    type: SAVE_MESSAGE_SUCCESS,
    payload: {
      chatMessage: chatMsg 
    }
    });
  if(!boxExists && chatMsg.answer){dispatch(savePendingMessage(chatMsg))}
};
