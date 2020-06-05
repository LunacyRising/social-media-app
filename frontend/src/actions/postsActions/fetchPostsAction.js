import axios from "axios";
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL, POSTS_LOADING, FETCH_POSTS_BY_SEARCH } from "../types";
import { returnMessages } from "../messagesActions";


export const fetchPosts = () => async (dispatch, getState) => {
  
  let { skip, limit, amountOfPosts, query } = getState().postReducer;
 
  dispatch({ type: POSTS_LOADING }); 
  try {
    let response = await axios.post(`http://localhost:5001/posts/`,
     {skip, limit, query}
    );

    let posts = response.data.posts; 

    dispatch({
      type: query === undefined || "" ? FETCH_POSTS_SUCCESS : FETCH_POSTS_BY_SEARCH, 
      payload: {
        posts,
        skip:  skip + limit,
        amountOfPosts : amountOfPosts + response.data.amountOfPosts
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

