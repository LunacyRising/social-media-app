import { GET_MESSAGES, CLEAR_MESSAGES, SNACK_OPEN, SNACK_CLOSE } from "./types";

//return messages

export const returnMessages = (messageCode) => {  
  return {
    type: GET_MESSAGES,
    payload: messageCode 
  };
};

//clear messages

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES
  };
};
// snack
export const snackOpen = () => {
  return {
    type: SNACK_OPEN
  };
};

export const snackClose = () => {
  return {
    type: SNACK_CLOSE
  };
};
