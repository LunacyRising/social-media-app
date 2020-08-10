import { DARK_MODE } from "../actions/types";
  
  const initialState = {
    darkMode : false
  };
  
  const darkModeReducer = (state = initialState, action) => {
    switch (action.type) {
      case DARK_MODE: {
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
  