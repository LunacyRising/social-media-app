import { OPEN_CHAT_MENU, CLOSE_CHAT_MENU } from "./types";


export const openChatMenu = (id) => {
    console.log("id", id)
    return {
      type: OPEN_CHAT_MENU,
      payload: id
    };
  };
  
  export const closeChatMenu = (id) => {
    return {
      type: CLOSE_CHAT_MENU,
      payload: id
    };
  };
  