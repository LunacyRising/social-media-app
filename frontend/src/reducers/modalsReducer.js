import {
    MODAL_LOGIN_OPEN,
    MODAL_LOGIN_CLOSE,
    MODAL_REGISTER_OPEN,
    MODAL_REGISTER_CLOSE,
    OPEN_DRAWER,
    CLOSE_DRAWER
  } from "../actions/types";
  
  const initialState = {
    openLogin: false,
    openRegister: false,
    openDrawer: false
  };
  
  const modalsReducer = (state = initialState, action) => {
    switch (action.type) {
      case MODAL_LOGIN_OPEN: {
        return {
          openLogin: true 
        };
      }
      case MODAL_LOGIN_CLOSE: {
        return {
          openLogin: false
        };
      };
      case MODAL_REGISTER_OPEN: {
        return {
          openRegister: true
        }
      };
      case MODAL_REGISTER_CLOSE: {
        return {
          openRegister: false
        }
      };
      case OPEN_DRAWER: {
        return {
          openDrawer: true
        }
      };
      case CLOSE_DRAWER: {
        return {
          openDrawer: false
        }
      };
      default:
        return state;
    }
  };
  
  export default modalsReducer;
  