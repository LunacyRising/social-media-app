import {
  LOADING,
  FETCH_POSTS_SUCCESS,
  LOADING_MORE_POSTS,
  FETCH_POSTS_FAIL,
  POSTS_LOADING,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  EDIT_POST_FAIL,
  EDIT_POST_SUCCESS,
  DELETE_POST,
  FAIL_DELETE_POST,
  LIKE_SUCCESS,
  DISLIKE_SUCCESS,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
  FETCH_OLDEST_POSTS,
  FETCH_POST_MOST_LIKES,
  UPDATE_PROFILE_SUCCESS,
  UPLOAD_IMAGE_SUCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from "../actions/types";


const initialState = {
  loading: false,
  postsLoading: false,
  loadingMorePosts: false,
  skip: 0, 
  limit: 2,
  amountOfPosts: 0, 
  posts: [],
  postToEdit: []
};

const postsReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOADING:
      return {
        ...state
      };
    case POSTS_LOADING:
      return {
        ...state,
        loadingMorePosts: true
      };
    case LOADING_MORE_POSTS:
      return {
        ...state,
        loadingMorePosts: true
      };
    case FETCH_POSTS_SUCCESS:
    case FETCH_OLDEST_POSTS:
    case FETCH_POST_MOST_LIKES:
      return {
        ...state,
        loadingMorePosts: false,
        posts: [...state.posts, ...action.payload.posts],
        skip: action.payload.skip,
        amountOfPosts: action.payload.amountOfPosts
      };
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        ...action.payload
    };
    case UPLOAD_IMAGE_SUCESS:
      return {
        ...state,
        posts: action.payload.posts
      };
    case UPDATE_PROFILE_SUCCESS: 
      return {
        ...state,
        posts: action.payload.posts
      }
    case FETCH_POSTS_FAIL:
    case FETCH_POST_FAIL:
    case EDIT_POST_FAIL:
      return {
        ...state,
        postsLoading: false
      };
    case FETCH_POST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        postsLoading: false
      };
    }
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
        postsLoading: false
      };
    case DELETE_POST:
      return {
        ...state,
        postsLoading: false,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case FAIL_DELETE_POST:
      return {
        ...state,
        postsLoading: false
      };
    case CREATE_POST_FAIL:
      return {
        ...state,
        postsLoading: false
      };
    case LIKE_SUCCESS: {
      return {
        ...state,
      };
    } 
    case DISLIKE_SUCCESS: {
      return {
        ...state
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        posts: action.payload
      }
    };
    case LOGIN_SUCCESS: {
      return {
        ...state,
        posts: action.payload.posts
      }
    }
    default:
      return state;
  }
};

export default postsReducer;
