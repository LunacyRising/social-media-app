import {
  GET_NOTIFICATIONS_SUCCESS,
  CREATE_NOTIFICATION_SUCCESS,
  CREATE_NOTIFICATION_FAIL,
  GET_NOTIFICATIONS_FAIL,
  NOTIFICATIONS_LOADING,
  DELETE_NOTIFICATION,
  DELETE_ALL_NOTIFICATIONS, 
  } from "../actions/types";
  
  const initialState = {
    notificationsLoading: false,
    notifications: []
  };
  
  const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
      case NOTIFICATIONS_LOADING:
        return {
          ...state,
          notificationsLoading: true
        };
        case CREATE_NOTIFICATION_SUCCESS:
        return {
          ...state,
          ...action.payload,
        };
      case DELETE_NOTIFICATION:
        return {
          ...state,
          notifications: action.payload
        };
      case DELETE_ALL_NOTIFICATIONS: 
        return {
          ...state,
          notifications: []
        };
      case GET_NOTIFICATIONS_SUCCESS:
        return {
          ...state,
          ...action.payload,
          notificationsLoading: false
        };
      case CREATE_NOTIFICATION_FAIL:
      case GET_NOTIFICATIONS_FAIL:
        return {
          ...state,
          notificationsLoading: false
        };
      default:
        return state;
    }
  };
  
  export default notificationsReducer;