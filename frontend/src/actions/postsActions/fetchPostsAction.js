import axios from "axios";
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL, POSTS_LOADING, FETCH_POSTS_BY_SEARCH } from "../types";
import { returnMessages } from "../messagesActions";


export const fetchPosts = (sortOrder, replacePosts) => async (dispatch, getState) => {
  
  let { skip, limit, query, sortOptions } = getState().postReducer; 

  /*si la accion viene de alguno de los botones de sort se va a utilizar su opcion de sort para los posts
  de otra manera se va a utilizar la opcion del reducer*/
  let sort = sortOrder ? sortOrder : sortOptions;
  // si la accion viene de alguno de los botones de sort el offset va a ser 0 
  let offSet = sortOrder ? 0 : skip;

  dispatch({ type: POSTS_LOADING })

  try {
    const response = await axios.post(`http://localhost:5001/posts/`, 
     {offSet, limit, query, sort}
    );

    console.log(response) 

    dispatch({ 
      type: FETCH_POSTS_SUCCESS,
      payload: {
        posts : response.data.posts, 
        skip:  offSet + limit,
        maxResults : response.data.maxResults,
        sortOptions: sort,
        replacePosts
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

