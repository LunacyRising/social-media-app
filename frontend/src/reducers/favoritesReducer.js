import {
    LOGIN_SUCCESS,
    FAVORITES_LOADING,
    FAVORITE_ADDED,
    FAVORITE_FAIL,
    GET_FAVORITES,
    GET_FAVORITES_FAIL,
    FAVORITE_DELETED,
  } from "../actions/types";  
  
  const initialState = {
    favoritesLoading : false,
    favoritesSqueleton: [],
    favorites: []
  };
  
  const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS: 
        return {
          ...state,
          favoritesSqueleton : action.payload.favorites
        };
      case FAVORITES_LOADING:
        return {
          ...state,
          favoritesLoading: true
        };
      case FAVORITE_ADDED:
        return {
          ...state,
          favoritesSqueleton: [action.payload, ...state.favoritesSqueleton],
          favoritesLoading: false
        };
      case FAVORITE_FAIL:
        return {
          ...state,
          favoritesLoading: false
        };
        case GET_FAVORITES:
        return {
          ...state,
          ...action.payload,
          favoritesLoading: false
        };
        case GET_FAVORITES_FAIL:
        return {
          ...state,
          favoritesLoading: false
        };
        case FAVORITE_DELETED:
          return {
            ...state,
            favorites: action.payload.favorites,
            favoritesSqueleton: action.payload.squeletons,
          }
      default:
        return state;
    }
  };
  
  export default favoritesReducer;
  