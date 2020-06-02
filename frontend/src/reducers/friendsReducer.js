import {FRIENDS_LOADING, FRIENDS_LOADED, ADDING_FRIEND, FRIEND_ADDED, FAILED_ADD_FRIEND, FAILED_FETCH_FRIENDS} from "../actions/types"; 
  
  const initialState = {
    friends: [],
    isLoading: false,
    friendsLoading: false
  };
  
  const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FRIENDS_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case FRIENDS_LOADED:
        return {
          ...state,
          isLoading: false,
          friends: action.payload
        };
      case FAILED_FETCH_FRIENDS:
          return {
            ...state,
            isLoading: false
          };  
      case ADDING_FRIEND:
        return {
          ...state,
          friendsLoading: true
        };
      case FRIEND_ADDED:
        return {
          ...state,
          friendsLoading: false
        };
      case FAILED_ADD_FRIEND:
        return {
          ...state,
          friendsLoading: false
        };
      default:
        return state;
    }
  };
  
  export default friendsReducer;
  