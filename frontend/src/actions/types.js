//global
export const LOADING = "LOADING";
// auth
export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const MAIL_CONFIRMED = "MAIL_CONFIRMED";
export const MAILCONFIRMED_FAIL = "MAILCONFIRMATION_FAIL";
export const WAITING_MAILCONFIRMATION = "WAITING_MAILCONFIRMATION"; 
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const GET_MESSAGES = "GET_MESSAGES";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";
export const ADMIN_AUTH = "ADMIN_AUTH";
export const USER_AUTH = "USER_AUTH";
export const VERIFYCAPTCHA_SUCCESS = "VERIFYCAPTCHA_SUCCESS";
export const VERIFYCAPTCHA_FAIL = "VERIFYCAPTCHA_FAIL";
export const LOGING_OUT = "LOGING_OUT";
export const FAIL_LOGOUT = "FAIL_LOGOUT";
////////////////////////////////////////////////////
//userPage
export const SUCCESS_SUBMIT = "SUCCESS_SUBMIT";
export const FAIL_SUBMIT = "FAIL_SUBMIT";
////////////////////////////////////////////
export const EDIT_PROFILE = "EDIT_PROFILE";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const EDITPROFILE_FAIL = "EDITPROFILE_FAIL";
export const PROFILE_UPDATING = "PROFILE_UPDATING";
export const IMAGE_LOADING = "IMAGE_LOADING";
export const GALLERY_LOADING = "GALLERY_LOADING";
export const UPLOAD_IMAGE_GALLERY_SUCCESS = "UPLOAD_IMAGE_GALLERY_SUCCESS";
export const UPLOAD_IMAGE_GALLERY_FAILED = "UPLOAD_IMAGE_GALLERY_FAILED";
export const FETCH_GALLERY_SUCCESS = "FETCH_GALLERY_SUCCESS";
export const FETCH_GALLERY_FAIL = "FETCH_GALLERY_FAIL";
export const CHANGE_PAGE = "CHANGE_PAGE";
///////////////////////////////////////////////////
//usersData
export const GET_USERS = "GET_USERS";
export const GET_USERSFAIL = "GET_USERSFAIL";
export const GET_USER = "GET_USER";
export const GET_USERFAIL = "GET_USERFAIL";
export const DATA_LOADING = "DATA_LOADING";
export const DELETE_USER = "DELETE_USER";
export const FAILDELETE_USER = "FAILDELETE_USER";
export const EDIT_USER = "EDIT_USER";
export const EDITUSER_SUCCESS = "EDITUSER_SUCCESS";
export const EDITUSER_FAIL = "EDITUSER_FAIL";
//////////////////////////////////////////////
// posts
export const POSTS_LOADING = "POSTS_LOADING";
export const FETCH_INITIAL_POSTS_SUCCESS = "FETCH_INITIAL_POSTS_SUCCESS";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_BY_SEARCH = "FETCH_POSTS_BY_SEARCH";
export const LOADING_MORE_POSTS = "LOADING_MORE_POSTS";
export const LOAD_MORE = "LOAD_MORE";
export const FETCH_POSTS_FAIL = "FETCH_POSTS_FAIL";
export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_LIKES_DISLIKES_SUCCESS = "FETCH_LIKES_DISLIKES_SUCCESS";
export const FETCH_POST_FAIL = "FETCH_POST_FAIL";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAIL = "CREATE_POST_FAIL";
export const POST_IMAGE_PREVIEW_SUCCESS = "POST_IMAGE_PREVIEW_SUCCESS";
export const POST_IMAGE_PREVIEW_FAILED = "POST_IMAGE_PREVIEW_FAILED";
export const FETCH_OLDEST_POSTS = "FETCH_OLDEST_POSTS";
export const FETCH_POST_MOST_LIKES = "FETCH_POST_MOST_LIKES";
export const UPLOAD_IMAGE_SUCESS = "UPLOAD_IMAGE_SUCESS";
export const UPLOAD_IMAGE_FAIL = "UPLOAD_IMAGE_FAIL";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
export const EDIT_POST_FAIL = "EDIT_POST_FAIL";
export const DELETE_POST = "DELETE_POST";
export const FAIL_DELETE_POST = "FAIL_DELETE_POST";
////////////////////////////////////////////////////
//gifs
export const GIFS_LOADING = "GIFS_LOADING"; 
export const FETCH_GIFS_SUCCESS = "FETCH_GIFS_SUCCESS";
export const FETCH_GIFS_FAILED = "FETCH_GIFS_FAILED";
export const FETCH_GIFS_BY_QUERY_SUCCESS = "FETCH_GIFS_BY_QUERY_SUCCESS";
export const FETCH_GIFS_BY_QUERY_FAILED = "FETCH_GIFS_BY_QUERY_FAILED";
export const UPDATE_QUERY_GIF = "UPDATE_QUERY_GIF";
//likes dislikes
export const FETCH_LIKES_SUCCESS = "FETCH_LIKES_SUCCESS";
export const FETCH_LIKES_FAILED = "FETCH_LIKES_FAILED";
export const FETCH_DISLIKES_SUCCESS = "FETCH_DISLIKES_SUCCESS";
export const FETCH_DISLIKES_FAILED = "FETCH_DISLIKES_FAILED";
export const LIKE_LOADING = "LIKE_LOADING"; 
export const LIKE_SUCCESS = "LIKE_SUCCESS";
export const LIKE_FAIL = "LIKE_FAIL";
export const DISLIKE_LOADING = "DISLIKE_LOADING"; 
export const DISLIKE_SUCCESS = "DISLIKE_SUCCESS";
export const DISLIKE_FAIL = "DISLIKE_FAIL";
////////////////////////////////////////////////////////////
// msj snack
export const SNACK_OPEN = "SNACK_OPEN";
export const SNACK_CLOSE = "SNACK_CLOSE";
////////////////////////////////////////////////////////////
// comments
export const SUCCESS_COMMENT = "SUCCESS_COMMENT";
export const FAIL_COMMENT = "FAIL_COMMENT";
export const REPLY_SUCCESS = "REPLY_SUCCESS";
export const REPLY_FAILED = "REPLY_FAILED";
export const FETCH_REPLY_SUCCESS = "FETCH_REPLY_SUCCESS";
export const FETCH_REPLY_FAILED = "FETCH_REPLY_FAILED";
export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const FAIL_FETCH_COMMENTS = "FAIL_FETCH_COMMENTS";
export const COMMENTS_LOADING = "COMMENTS_LOADING";
export const FETCH_COMMENTS_BY_POST = "FETCH_COMMENTS_BY_POST";
export const LIKE_COMMENT_SUCCESSS = "LIKE_COMMENT_SUCCESSS";
export const LIKE_COMMENT_FAILED = "LIKE_COMMENT_FAILED";
export const DISLIKE_COMMENT_SUCCESS = "DISLIKE_COMMENT_SUCCESS";
export const DISLIKE_COMMENT_FAILED = "DISLIKE_COMMENT_FAILED";
/////////////////////////////////////////////////////////////
//modals
export const MODAL_LOGIN_OPEN = "MODAL_LOGIN_OPEN";
export const MODAL_LOGIN_CLOSE = "MODAL_LOGIN_CLOSE";
export const MODAL_REGISTER_OPEN = "MODAL_REGISTER_OPEN";
export const MODAL_REGISTER_CLOSE = "MODAL_REGISTER_CLOSE";
export const OPEN_DRAWER = "OPEN_DRAWER";
export const CLOSE_DRAWER = "CLOSE_DRAWER";
/////////////////////////////////////////////////////////////
//darkMode
export const DARK_MODE_ON = "DARL_MODE_ON";
/////////////////////////////////////////////////////////////
//notifications
export const NOTIFICATIONS_LOADING = "NOTIFICATIONS_LOADING";
export const CREATE_NOTIFICATION_SUCCESS ="CREATE_NOTIFICATION_SUCCESS";
export const CREATE_NOTIFICATION_FAIL ="CREATE_NOTIFICATION_FAIL";
export const GET_NOTIFICATIONS_SUCCESS = "GET_NOTICICATIONS_SUCCESS";
export const GET_NOTIFICATIONS_FAIL = "GET_NOTIFICATIONS_FAIL";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const FAIL_DELETE_NOTIFICATION = "FAIL_DELETE_NOTIFICATION";
export const DELETE_ALL_NOTIFICATIONS = "DELETE_ALL_NOTIFICATIONS";
///////////////////////////////////////////////////////////////
//favorites
export const FAVORITE_ADDED = "FAVORITE_ADDED";
export const FAVORITE_FAIL = "FAVORITE_FAIL";
export const FAVORITES_LOADING = "FAVORITES_LOADING";
export const GET_FAVORITES = "GET_FAVORITES";
export const GET_FAVORITES_FAIL = "GET_FAVORITES_FAIL";
export const FAVORITE_DELETED ="FAVORITE_DELETED";
export const FAVORITE_DELETED_FAIL = "FAVORITE_DELETED_FAIL";
/////////////////////////////////////////////////////////////////
//friends
export const FRIENDS_LOADING = "FRIENDS_LOADING";
export const FRIENDS_LOADED = "FRIENDS_LOADED";
export const FAILED_FETCH_FRIENDS = "FAILED_FETCH,FRIENDS";
export const ADDING_FRIEND = "ADDING_FRIEND";
export const FRIEND_ADDED = "FRIEND_ADDED";
export const FAILED_ADD_FRIEND = "FAILED_ADD_FRIEND";


export const QUERY_FORM = "QUERY_FORM";