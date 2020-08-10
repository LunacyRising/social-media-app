import {
    MODAL_LOGIN_OPEN,
    MODAL_LOGIN_CLOSE,
    MODAL_REGISTER_OPEN,
    MODAL_REGISTER_CLOSE,
    OPEN_DRAWER,
    CLOSE_DRAWER,
    OPEN_CHAT_MENU,
    CLOSE_CHAT_MENU
  } from "../actions/types";
  
  const initialState = {
    openLogin: false,
    openRegister: false,
    openDrawer: false,
    chatMenuIds: []
  };
  
  const modalsReducer = (state = initialState, action) => {
    switch (action.type) {
      case MODAL_LOGIN_OPEN: {
        return {
          ...state,
          openLogin: true 
        };
      }
      case MODAL_LOGIN_CLOSE: {
        return {
          ...state,
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
          ...state,
          openRegister: false
        }
      };
      case OPEN_DRAWER: {
        return {
          ...state,
          openDrawer: true
        }
      };
      case CLOSE_DRAWER: {
        return {
          ...state,
          openDrawer: false
        }
      };
      case OPEN_CHAT_MENU: {
        return {
          ...state,
          chatMenuIds: [action.payload, ...state.chatMenuIds]
        }
      };
      case CLOSE_CHAT_MENU: {
        return {
          ...state,
          openChatMenu: false
        }
      };
      default:
        return state;
    }
  };
  
  export default modalsReducer;
  