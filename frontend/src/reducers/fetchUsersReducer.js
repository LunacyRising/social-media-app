import {
  GET_USERS,
  GET_USER,
  DATA_LOADING,
  GET_USERSFAIL,
  DELETE_USER,
  FAILDELETE_USER,
  EDIT_USER,
  EDITUSER_FAIL,
  EDIT_PROFILE,
  EDITPROFILE_FAIL,
  UPLOAD_IMAGE_SUCESS,
  UPLOAD_IMAGE_FAIL
} from "../actions/types";

const initialState = {
  isLoading: false,
  token: null,
  role: null
};

const fetchUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_USERS:
      return {
        ...state,
        isLoading: false,
        ...action.payload
      };
    case GET_USERSFAIL:
      return {
        ...state,
        isLoading: false
      };
    case GET_USER:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case DELETE_USER:
      return {
        ...state,
        isLoading: false
      };
    case FAILDELETE_USER:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_USER:
      return {
        ...state,
        isLoading: false
      };
    case EDITUSER_FAIL:
      return {
        ...state,
        isLoading: false
      };
    case EDIT_PROFILE:
      return {
        ...state
      };
    case EDITPROFILE_FAIL:
      return {
        ...state
      };
    case UPLOAD_IMAGE_SUCESS:
      return {
        ...state
      };
    case UPLOAD_IMAGE_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default fetchUsersReducer;
