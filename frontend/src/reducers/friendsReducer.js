import {
  FRIEND_REQUESTS_LOADED,
  FRIEND_REQUESTS_FAILED,
  FRIENDS_LOADING,
  FRIENDS_LOADED,
  ADDING_FRIEND,
  FRIEND_ADDED,
  FAILED_ADD_FRIEND,
  FAILED_FETCH_FRIENDS,
  CANCEL_FRIEND_REQUEST_SUCCESS,
  CANCEL_FRIEND_REQUEST_FAILED,
  ACCEPT_FRIEND_REQUEST_SUCCESS,
  LOGIN_SUCCESS
  } from "../actions/types"; 
  
  const initialState = {
    friendRequests: [],
    friendLinks: [],
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
      case FRIEND_REQUESTS_LOADED:
        return {
          ...state,
          friendRequests: action.payload
        };
      case FRIEND_REQUESTS_FAILED:
        return {
          ...state
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
      /*case FRIEND_ADDED:
        return {
          ...state,
          friends: [action.payload, ...state.friends],
          friendsLoading: false
        };*/
      case FAILED_ADD_FRIEND:
        return {
          ...state,
          friendsLoading: false
        };
      case CANCEL_FRIEND_REQUEST_SUCCESS:
          return {
            ...state,
            friendRequests: action.payload
        };
      case CANCEL_FRIEND_REQUEST_FAILED:
          return {
            ...state
        };
      case ACCEPT_FRIEND_REQUEST_SUCCESS:
        return{
          ...state,
          friendLinks: [action.payload, ...state.friendLinks]
        }
      case LOGIN_SUCCESS:
        return {
          ...state,
          friendRequests: [...action.payload.friendRequests]
        }
      default:
        return state;
    }
  };
  
  export default friendsReducer;
  