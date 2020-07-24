import axios from "axios";
import { GIFS_LOADING, FETCH_GIFS_SUCCESS, FETCH_GIFS_FAILED } from "../types";
import { returnMessages } from "../messagesActions";
const CancelToken = axios.CancelToken;
let cancel;  

export const fetchGifs = () => async (dispatch, getState) => { 
  
  const { gifOffset, gifLimit, gifQuery } = getState().gifsReducer; 

  dispatch({ type: GIFS_LOADING}); 

  try {
    cancel && cancel();
    const response = await axios.post("http://localhost:5001/gifs/", { gifOffset, gifLimit, gifQuery }, { cancelToken: new CancelToken(c =>  cancel = c) });

    dispatch({ 
      type: FETCH_GIFS_SUCCESS,
      payload: {
          gifs: response.data.gifs,
          gifOffset: gifOffset + gifLimit,
          maxResults: response.data.maxResults
         }
    });
    dispatch(returnMessages(response.data.code))
  } catch (err) {
    if(axios.isCancel(err)) return;
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FETCH_GIFS_FAILED
    });
  }
};

