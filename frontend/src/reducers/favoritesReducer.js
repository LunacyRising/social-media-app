import {
    FAVORITES_LOADING,
    FAVORITE_ADDED,
    FAVORITE_FAIL,
    GET_FAVORITES,
    GET_FAVORITES_FAIL,
    FAVORITE_DELETED,
  } from "../actions/types";  
  
  const initialState = {
    favoritesLoading : false,
    favorites: []
  };
  
  const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FAVORITES_LOADING:
        return {
          ...state,
          favoritesLoading: true
        };
      case FAVORITE_ADDED:
        return {
          ...state,
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
            favorites: state.favorites.filter(fav => fav._id !== action.payload)
          }
      default:
        return state;
    }
  };
  
  export default favoritesReducer;
  