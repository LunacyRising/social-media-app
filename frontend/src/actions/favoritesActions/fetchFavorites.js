import axios from "axios";
import { returnMessages } from "../messagesActions";
import {  GET_FAVORITES, GET_FAVORITES_FAIL, FAVORITES_LOADING } from "../types"; 

export const fetchFavorites = () => async (dispatch, getState) => {
  
  const { token, userId } = getState().authReducer;

  dispatch({ type: FAVORITES_LOADING }); 

  try {
    let response = await axios.get(`http://localhost:5001/favorites/${userId}`,
    {
      headers: { "auth-token": token }
    }
  );
    let data = response.data
      let promisesArray = [];
      promisesArray = data.map( async item => {
      const postId = item.postId
      //console.log(item._id)
       return await axios.get(`http://localhost:5001/posts/${postId}`,{headers: { "auth-token": token }})
    })
    
   Promise.all(promisesArray)
    .then(values => {
      console.log(values)
      let arr = []
      values.map(value => {
       arr.push (value.data.post)
      });
      console.log(arr)
      dispatch({
        type: GET_FAVORITES, 
        payload: {
          favorites: arr
        }
      });
    })
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: GET_FAVORITES_FAIL
    });
  }
};