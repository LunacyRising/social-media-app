import {
  SUCCESS_COMMENT,
  REPLY_SUCCESS,
  FETCH_REPLY_SUCCESS,
  FAIL_COMMENT,
  FETCH_COMMENTS,
  FETCH_COMMENTS_BY_POST,
  FAIL_FETCH_COMMENTS,
  COMMENTS_LOADING,
  LIKE_COMMENT_SUCCESSS,
  DISLIKE_COMMENT_SUCCESS,
  CHANGE_AVATAR_SUCESS,
  UPDATE_PROFILE_SUCCESS
} from "../actions/types"; 
 
const initialState = {
  comments: [],
  commentsLoading: false,
  loading: false,
  amountOfComments: 0,
  amountOfReplies: 0,
  replies: []
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_LOADING: 
      return {
        ...state,
        commentsLoading: true
      };
    case SUCCESS_COMMENT:
      return {
        ...state,
        comments: [action.payload.comment, ...state.comments], 
        loading: false
      };
    case FAIL_COMMENT:
      return {
        ...state,
        loading: false
      };
    case REPLY_SUCCESS: {
      return {
        ...state,
        replies: [ action.payload.reply, ...state.replies ],
        comments: action.payload.comments
      }
    }
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
        comments : [...state.comments, ...action.payload.comments],  
        amountOfComments: action.payload.amountOfComments, 
        commentsLoading: false 
      };
    case FAIL_FETCH_COMMENTS:
      return {
        ...state
      };
    case FETCH_REPLY_SUCCESS:
      return {
        ...state,
        replies: [...action.payload.replies, ...state.replies],
        amountOfReplies: action.payload.amountOfReplies
      }
    case LIKE_COMMENT_SUCCESSS:
      return {
        ...state,
        comments: action.payload.comments,
        replies: action.payload.replies
      }
    case DISLIKE_COMMENT_SUCCESS:  
      return {
        ...state,
        comments: action.payload.comments,
        replies: action.payload.replies
      }
    case CHANGE_AVATAR_SUCESS: 
      return {
        ...state,
        comments: action.payload.comments,
        replies: action.payload.replies
      }
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
