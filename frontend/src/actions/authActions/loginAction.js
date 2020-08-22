import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { loginModalClose } from "../modalsActions/login";
import { USER_LOADING, LOGIN_SUCCESS, LOGIN_FAIL } from "../types";
import { editKeyValue } from "../../helperFunctions/editKeyValue";
import { fetchFriends } from "../friendsActions/fetchFriends";

export const loginAction = ({ email, password }) => async (dispatch, getState) => {

  const { posts } = getState().postReducer;

  const keyValue = {userIsOnline : true}

  try {
    dispatch({ type: USER_LOADING });
    const response = await axios.post("http://localhost:5001/login",  
    { email, password });

    console.log(response);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
          token: response.data.token,
          userName: response.data.user.userName,
          role: response.data.user.role,
          amountOfPosts: response.data.user.amountOfPosts,
          userId: response.data.user._id,
          email: response.data.user.email,
          avatar: response.data.user.avatar,
          likes: response.data.likes,
          dislikes: response.data.dislikes,
          favorites: response.data.favorites,
          friendRequests: response.data.friendRequests,
          posts: editKeyValue(posts, response.data.user._id, "userId", keyValue)    
      }
    });

    dispatch(fetchFriends())

    dispatch(loginModalClose())

    dispatch(snackOpen());

    const messageCode = response.data.code; 

    dispatch(returnMessages(messageCode));  

  } catch (err) {
    console.log(err.response);
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode)); 
    dispatch(snackOpen());
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
