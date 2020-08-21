import { CREATE_CHAT_BOX } from "../types";


export const createChatBox = (chatBox) => {

    return {
      type: CREATE_CHAT_BOX,
      payload: chatBox
    };
  };
  
  