import { MODAL_LOGIN_OPEN, MODAL_LOGIN_CLOSE } from "../types";


export const loginModalOpen = () => {
    return {
      type: MODAL_LOGIN_OPEN
    };
  };
  
  export const loginModalClose = () => {
    return {
      type: MODAL_LOGIN_CLOSE
    };
  };
  