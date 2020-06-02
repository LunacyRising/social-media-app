import {
    DARK_MODE_ON
  } from "../actions/types";
  
  const initialState = {
    darkMode : false
  };
  
  const darkModeReducer = (state = initialState, action) => {
    switch (action.type) {
      case DARK_MODE_ON: {
        let mode = !state.darkMode
        return {
            ...state,
            darkMode: mode
        }
      };
      default:
        return state;
    }
  };
  
  export default darkModeReducer;
  