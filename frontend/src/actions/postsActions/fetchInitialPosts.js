import { FETCH_INITIAL_POSTS_SUCCESS, FETCH_POSTS_FAIL, POSTS_LOADING, POSTS_LOADING2 } from "../types";
import { returnMessages } from "../messagesActions";
import apiUtil  from "../../utils/apiUtil/apiUtil";

export const fetchInitialPosts = () => async (dispatch, getState) => {
  let { limit, sortOptions } = getState().postReducer; 
  const offSet = 0;
  const sort = sortOptions;
  
  dispatch({ type: POSTS_LOADING });

  dispatch({ type: POSTS_LOADING2 });

  try {
    const response = await apiUtil.post("/posts", {offSet, limit, sort});

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


