import {
  FETCH_INITIAL_POSTS_SUCCESS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  POSTS_LOADING,
  POST_IMAGE_PREVIEW_SUCCESS,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  EDIT_POST_FAIL,
  EDIT_POST_SUCCESS,
  DELETE_POST,
  FAIL_DELETE_POST,
  LIKE_LOADING,
  LIKE_SUCCESS,
  LIKE_COMMENT_SUCCESSS,
  DISLIKE_COMMENT_SUCCESS,
  DISLIKE_LOADING,
  DISLIKE_SUCCESS,
  SUCCESS_COMMENT,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
  UPDATE_PROFILE_SUCCESS,
  CHANGE_AVATAR_SUCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  QUERY_FORM,
} from "../actions/types"; 


const initialState = {
  loading: false, 
  loadingMorePosts: false,
  postsLoading : false,
  likeLoading: false,
  dislikeLoading: false,
  skip: 0, 
  limit: 2,
  maxResults: 0,  
  allLikes: [],
  allDislikes: [],
  posts: [],
  post: {},
  query: null,
  preview: null
};

const postsReducer = (state = initialState, action) => {

  switch (action.type) {

    case POSTS_LOADING: 
      return {
        ...state,
        postsLoading: true
      };
    case FETCH_INITIAL_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        skip: action.payload.skip,
        maxResults: action.payload.maxResults,
        postsLoading: false
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        skip: action.payload.skip,
        maxResults: action.payload.maxResults,
        postsLoading: false
      }; 
    case FETCH_POST_SUCCESS: 
      return {
        ...state,
        post: action.payload,
        loading: false
      };  
    case QUERY_FORM : {
      return {
        ...state,
        query: action.payload.query,
        skip: action.payload.skip,
        amountOfPosts: action.payload.amounOfPosts,
        posts: action.payload.cleanPosts
      }
    }; 
    case FETCH_POSTS_FAIL: 
    case FETCH_POST_FAIL:
    case EDIT_POST_FAIL:
      return {
        ...state,
        postsLoading: false,
        loadingMorePosts: false
      }; 
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload
    };
    case LIKE_LOADING: 
      return {
        ...state,
        likeLoading: true
      };
    case LIKE_SUCCESS:
        return {
          ...state,
          posts: action.payload.posts,
          allLikes: [action.payload.like, ...state.allLikes], 
          allDislikes: action.payload.filteredDislikes,
          likeLoading: false
        };
    case LIKE_COMMENT_SUCCESSS:
        return {
          ...state,
          allLikes: [...state.allLikes, action.payload.like],
          allDislikes: action.payload.filteredDislikes
        };
    case DISLIKE_COMMENT_SUCCESS:
      return {
        ...state,
        allDislikes: [...state.allDislikes, action.payload.dislike], 
        allLikes: action.payload.filteredLikes
      }
    case SUCCESS_COMMENT:
      return {
        ...state, 
        posts: action.payload.posts
      }
    case DISLIKE_LOADING:
      return {
        ...state,
        dislikeLoading: true
      }
    case DISLIKE_SUCCESS:
        return {
          ...state,
          posts: action.payload.posts,
          allDislikes: [action.payload.savedDislike, ...state.allDislikes], 
          allLikes: action.payload.filteredLikes, 
          dislikeLoading: false
        }
    case CHANGE_AVATAR_SUCESS:
      return {
        ...state,
        posts: action.payload.posts
      };
    case UPDATE_PROFILE_SUCCESS: 
      return {
        ...state,
        posts: action.payload.posts
      };
    case POST_IMAGE_PREVIEW_SUCCESS:
      return {
        ...state,
        preview: action.payload
      }
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
        postsLoading: false,
        loadingMorePosts: false
      };
    case DELETE_POST:
      return {
        ...state,
        postsLoading: false,
        posts: action.payload
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
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        posts: action.payload,
        allLikes: null,
        allDislikes: null
      }
    };
    case LOGIN_SUCCESS: {
      return {
        ...state,
        posts: action.payload.posts,
        allLikes: action.payload.likes,
        allDislikes: action.payload.dislikes
      }
    }
    default:
      return state;
  }
};

export default postsReducer;
