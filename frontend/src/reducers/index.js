import { combineReducers } from "redux";
import messagesReducer from "./messagesReducer";
import authReducer from "./authReducer";
import fetchUsersReducer from "./fetchUsersReducer";
import postReducer from "./postsReducer";
import gifsReducer from "./gifsReducer";
import commentsReducer from "./commentsReducer";
import modalsReducer from "./modalsReducer";
import darkModeReducer from "./darkModeReducer";
import notificationsReducer from "./notificationsReducer";
import favoritesReducer from "./favoritesReducer";
import friendsReducer from "./friendsReducer";
import galleryReducer from "./galleryReducer";

const allReducers = combineReducers({
  messagesReducer,
  authReducer,
  fetchUsersReducer, 
  postReducer,
  gifsReducer,
  commentsReducer,
  modalsReducer,
  darkModeReducer,
  notificationsReducer,
  favoritesReducer,
  friendsReducer,
  galleryReducer
});

export default allReducers;
