import axios from "axios";
import { FETCH_REPLY_SUCCESS, FETCH_REPLY_FAILED } from "../types";
import { returnMessages } from "../messagesActions";

export const fetchReplies = ( commentId ) => async (dispatch) => {

    console.log(commentId)
  try {
    const response = await axios.get(`http://localhost:5001/${commentId}/replies`)

    dispatch({
      type: FETCH_REPLY_SUCCESS,
      payload: {
        replies:  response.data.replies,
        amountOfReplies: response.data.amountOfReplies  
      } 
    });
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    dispatch(returnMessages(errorCode));

    dispatch({
      type: FETCH_REPLY_FAILED
    });
  }
};
