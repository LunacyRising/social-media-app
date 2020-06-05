import {
  LOADING,
  SUCCESS_COMMENT,
  FAIL_COMMENT,
  FETCH_COMMENTS,
  FETCH_COMMENTS_BY_POST,
  FAIL_FETCH_COMMENTS,
  COMMENTS_LOADING,
  UPDATE_PROFILE_SUCCESS
} from "../actions/types"; 
 
const initialState = {
  comments: [],
  commentsLoading: false,
  loading: false,
  skip: 0, 
  limit: 1,
  amountOfComments: 0, 
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case COMMENTS_LOADING: 
      return {
        ...state,
        commentsLoading: true
      };
    case SUCCESS_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments], 
        loading: false
      };
    case FAIL_COMMENT:
      return {
        ...state,
        loading: false
      };
    case FETCH_COMMENTS:
      return {
        ...state,
        //comments: [action.payload.comments, ...state.comments],
        //amountOfPosts: state.amountOfPosts + action.payload.amountOfPosts,
        commentsLoading: false
      };
    case FETCH_COMMENTS_BY_POST:
      return {
        ...state,
        comments : [...action.payload.comments, ...state.comments], 
        amountOfComments: state.amountOfComments + action.payload.amountOfComments,
        commentsLoading: false
      };
    case FAIL_FETCH_COMMENTS:
      return {
        ...state
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        comments: action.payload.comments
      } 
    default:
      return state;
  }
};

export default commentsReducer;
