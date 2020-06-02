import {
  GET_MESSAGES,
  CLEAR_MESSAGES,
  SNACK_OPEN,
  SNACK_CLOSE
} from "../actions/types";

const initialState = {
  messageCode: null,
  message: null,
  isOpen: false
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        ...action.payload
      };
    case CLEAR_MESSAGES:
      return {
        messageCode: null,
        message: null
      };
    case SNACK_OPEN: {
      return {
        ...state,
        isOpen: true
      };
    }
    case SNACK_CLOSE: {
      return {
        ...state,
        isOpen: false
      };
    }

    default:
      return state;
  }
};

export default messagesReducer;
