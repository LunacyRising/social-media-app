import axios from "axios";
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL, POSTS_LOADING, FETCH_POSTS_BY_SEARCH } from "../types";
import { returnMessages } from "../messagesActions";


export const fetchPosts = () => async (dispatch, getState) => {
  
  let { skip, limit, amountOfPosts, query } = getState().postReducer;  

  console.log(query) 
 
  dispatch({ type: POSTS_LOADING })

  try {
    const response = await axios.post(`http://localhost:5001/posts/`, 
     {skip, limit, query }
    );

    const postsResponse = response.data.posts;   

    console.log(response)

    dispatch({ 
      type: FETCH_POSTS_SUCCESS,
      payload: {
        posts : postsResponse, 
        skip:  skip + limit,
        maxResults : response.data.maxResults
      }
    });
    dispatch(returnMessages(response.data.code))
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FETCH_POSTS_FAIL
    });
  }
};

