import { combineReducers } from "redux";
import messagesReducer from "./messagesReducer";
import authReducer from "./authReducer";
import fetchUsersReducer from "./fetchUsersReducer";
import postReducer from "./postsReducer";
import commentsReducer from "./commentsReducer";
import modalsReducer from "./modalsReducer";
import darkModeReducer from "./darkModeReducer";
import notificationsReducer from "./notificationsReducer";
import favoritesReducer from "./favoritesReducer";
import friendsReducer from "./friendsReducer";

const allReducers = combineReducers({
  messagesReducer,
  authReducer,
  fetchUsersReducer, 
  postReducer,
  commentsReducer,
  modalsReducer,
  darkModeReducer,
  notificationsReducer,
  favoritesReducer,
  friendsReducer
});

export default allReducers;
