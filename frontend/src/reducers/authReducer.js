import {
  USER_LOADING,
  PROFILE_UPDATING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGGING_OUT,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  WAITING_MAILCONFIRMATION,
  MAIL_CONFIRM_SUCCESS,
  MAIL_CONFIRM_FAILED,
  VERIFY_CAPTCHA_SUCCESS,
  VERIFY_CAPTCHA_FAIL,
  UPDATE_PROFILE_SUCCESS,
  CHANGING_AVATAR,
  CHANGE_AVATAR_SUCESS,
} from "../actions/types";

const initialState = {
  verificarMail: false,
  isAuthenticated: false,
  isLoading: false,
  isLogingOut: false,
  verifyCaptcha: false,
  token: null,
  role: null,
  amountOfPosts: null,
  userName: null,
  userId: null,
  email: null,
  avatar: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
    case PROFILE_UPDATING:
    case WAITING_MAILCONFIRMATION:
    case CHANGING_AVATAR:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userName: action.payload.userName,
        role: action.payload.role,
        amountOfPosts: action.payload.amountOfPosts,
        userId: action.payload.userId,
        email: action.payload.email,
        avatar: action.payload.avatar,
        isLoading: false,
        isAuthenticated: true,
        verifyCaptcha: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        verifyCaptcha: true
      };
    case VERIFY_CAPTCHA_SUCCESS:
      return {
        ...state,
        verifyCaptcha: true
      };
    case VERIFY_CAPTCHA_FAIL:
      return {
        ...state,
        verifyCaptcha: false
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case MAIL_CONFIRM_FAILED:
      return {
        ...state,
        isLoading: false
      };
    case MAIL_CONFIRM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        verificarMail: true
      };
    case CHANGE_AVATAR_SUCESS:
      return {
        ...state,
        avatar: action.payload.avatar,
        isLoading: false
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      }
    case LOGGING_OUT: 
      return {
        ...state,
        isLogingOut: true
      };
    case LOGOUT_SUCCESS:
      localStorage.clear();
      return {
        token: null,
        role: null,
        amountOfPosts: null,
        isAuthenticated: false,
        isLoading: false,
        isLogingOut: false,
        userName: null,
        verificarMail: false, 
        verifyCaptcha: false
      };
    default:
      return state;
  }
};

export default authReducer;
