import {
  USER_LOADING,
  PROFILE_UPDATING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGING_OUT,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  WAITING_MAILCONFIRMATION,
  MAIL_CONFIRMED,
  MAILCONFIRMED_FAIL,
  VERIFYCAPTCHA_SUCCESS,
  VERIFYCAPTCHA_FAIL,
  EDITUSER_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPLOAD_IMAGE_SUCESS,
  DATA_LOADING
} from "../actions/types";

const initialState = {
  verificarMail: false,
  isAuthenticated: false,
  isLoading: false,
  isLogingOut: false,
  avatarLoading: false,
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
      return {
        ...state,
        isLoading: true
      };
    case DATA_LOADING:
      return {
        ...state,
        avatarLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        //...action.payload,
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
    case VERIFYCAPTCHA_SUCCESS:
      return {
        ...state,
        verifyCaptcha: true
      };
    case VERIFYCAPTCHA_FAIL:
      return {
        ...state,
        verifyCaptcha: false
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case MAILCONFIRMED_FAIL:
      return {
        ...state,
        isLoading: false
      };
    case LOGING_OUT: 
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
    case MAIL_CONFIRMED:
      return {
        ...state,
        isLoading: false,
        verificarMail: true
      };
    case EDITUSER_SUCCESS:
    case UPLOAD_IMAGE_SUCESS:
      return {
        ...state,
        avatar: action.payload.avatar,
        avatarLoading: false
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      }
    default:
      return state;
  }
};

export default authReducer;
