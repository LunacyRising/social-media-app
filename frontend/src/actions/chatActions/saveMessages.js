import { SAVE_MESSAGE_SUCCESS } from "../types";
import { savePendingMessage } from "./savePendingMessage";
import { itemExists2 } from "../../helperFunctions/itemExists2"; 

export const saveMessages = (chatMsg) => async (dispatch, getState) => {
  
  const { chatBoxes } = getState().chatReducer;

  const boxExists = itemExists2(chatBoxes, chatMsg.senderId, "id")
  
  dispatch({ 
    type: SAVE_MESSAGE_SUCCESS,
    payload: {
      chatMessage: chatMsg 
    }
    });
  if(!boxExists && chatMsg.answer){dispatch(savePendingMessage(chatMsg))}
};
