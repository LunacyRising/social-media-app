import { GIFS_LOADING, FETCH_GIFS_SUCCESS, FETCH_GIFS_FAILED, FETCH_GIFS_BY_QUERY_SUCCESS, FETCH_GIFS_BY_QUERY_FAILED, UPDATE_QUERY_GIF } from "../actions/types";
  
  const initialState = {
    gifsLoading: false,
    gifLimit: 12,
    gifOffset: 0,
    maxResults: 0, 
    gifs: [],
    gifQuery: null 
  };
  
  const gifsReducer = (state = initialState, action) => { 
    switch (action.type) {
        case GIFS_LOADING: 
            return {
            ...state,
            gifsLoading: true
        };
        case FETCH_GIFS_SUCCESS:
            return {
            ...state,
            gifs: [...state.gifs, ...action.payload.gifs],
            gifOffset: action.payload.gifOffset,
            maxResults: action.payload.maxResults,
            gifsLoading: false
        };
        case FETCH_GIFS_FAILED:
            return {
            ...state,
            gifsLoading: false 
        };
        case FETCH_GIFS_BY_QUERY_SUCCESS:
            return {
            ...state,
            gifs: [...state.gifs, ...action.payload.gifs],
            gifOffset: action.payload.gifOffset,
            maxResults: action.payload.maxResults,
            gifsLoading: false
        };
        case FETCH_GIFS_BY_QUERY_FAILED:
            return {
            ...state,
            gifsLoading: false 
        };
        case UPDATE_QUERY_GIF:
            return {
            ...state,
            ...action.payload
        };
        default:
            return state;
        }
    };
  export default gifsReducer