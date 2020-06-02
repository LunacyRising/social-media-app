import axios from "axios";
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL, POSTS_LOADING,LOAD_MORE, LOADING_MORE_POSTS } from "../types";
import { returnMessages } from "../messagesActions";


export const fetchPosts = () => async (dispatch, getState) => {
  let { skip, limit } = getState().postReducer;

  dispatch({ type: POSTS_LOADING }); 
  try {
    let response = await axios.post(`http://localhost:5001/posts/`,
     {skip, limit}
    );
    let posts = response.data.posts;
    console.log(response.data.amountOfPosts)
    dispatch({
      type: FETCH_POSTS_SUCCESS,
      payload: {
        posts,
        skip:  skip + limit,
        amountOfPosts: response.data.amountOfPosts
      }
    });
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FETCH_POSTS_FAIL
    });
  }
};

