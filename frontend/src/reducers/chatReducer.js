import {
  CREATE_CHAT_BOX,
  DELETE_CHAT_BOX,
  SAVE_MESSAGE_SUCCESS,
  LOGOUT_SUCCESS
} from "../actions/types"; 
   
  const initialState = {
    chatBoxes: [],
    chatMessages: [],
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
      case LOGOUT_SUCCESS:
        return {
          ...state,
          chatBoxes: [],
          chatMessages: [],
          pendingMessages:[]
        };
      default:
        return state;
    }
  };
  
  export default chatReducer;
  