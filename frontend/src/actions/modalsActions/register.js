import { MODAL_REGISTER_OPEN, MODAL_REGISTER_CLOSE } from "../types";


export const registerModalOpen = () => {
    return {
      type: MODAL_REGISTER_OPEN 
    };
  };
  
  export const registerModalClose = () => {
    return {
      type: MODAL_REGISTER_CLOSE
    };
  };
  