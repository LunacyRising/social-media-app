import {
  CREATE_CHAT_BOX,
  DELETE_CHAT_BOX,
  SAVE_MESSAGE_SUCCESS,
  PENDING_MESSAGE_SUCCESS,
  PENDING_MESSAGE_DELETED,
} from "../actions/types"; 
   
  const initialState = {
    chatBoxes: [],
    chatMessages: [],
    pendingMessages:[],
    messageLoading: false
  };
  
  const chatReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_CHAT_BOX: {
        return {
          ...state,
          chatBoxes: [action.payload, ...state.chatBoxes]
        }
      };
      case DELETE_CHAT_BOX: {
        return {
          ...state,
          chatBoxes: action.payload
        }
      };
      case SAVE_MESSAGE_SUCCESS:
        return {
          ...state,
          chatMessages: [...state.chatMessages, action.payload.chatMessage], 
        };
      case PENDING_MESSAGE_SUCCESS:
        return {
          ...state,
          pendingMessages: [...state.pendingMessages, action.payload]
        };
      case PENDING_MESSAGE_DELETED:
        return {
          ...state,
          pendingMessages: action.payload
        };
      default:
        return state;
    }
  };
  
  export default chatReducer;
  