import axios from "axios";
import { FETCH_INITIAL_POSTS_SUCCESS, FETCH_POSTS_FAIL, POSTS_LOADING, POSTS_LOADING2 } from "../types";
import { returnMessages } from "../messagesActions";

export const fetchInitialPosts = () => async (dispatch, getState) => {

  let { limit, sortOptions } = getState().postReducer; 

  const offSet = 0;
  // lo puse dentro de una variable para que tenga el mismo nombre que el q pasa la accion de fetchposts al backend
  const sort = sortOptions;
  
  dispatch({ type: POSTS_LOADING });

  dispatch({ type: POSTS_LOADING2 });

  try {
    const response = await axios.post(`http://localhost:5001/posts/`, 
     {offSet, limit, sort}
    );

    console.log(response)

    dispatch({ 
      type: FETCH_INITIAL_POSTS_SUCCESS,
      payload: {
        posts : response.data.posts, 
        skip : offSet + limit,
        maxResults : response.data.maxResults
      }
    });
    dispatch(returnMessages(response.data.code))
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FETCH_POSTS_FAIL
    });
  }
};


