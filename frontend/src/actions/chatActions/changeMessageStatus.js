import axios from "axios";
import { CHANGE_MESSAGE_STATUS } from "../types";
import { editKeyValue } from "../../helperFunctions/editKeyValue";
import { changeMessagesStatus } from "../../helperFunctions/changeMessagesStatus";

export const changeMessageStatus = (id, status, seenAt) => async (dispatch,getState) => {

  const{ chatMessages } = getState().chatReducer;  

  console.log("chatMessages", chatMessages)

  const t = {
    messageStatus : status
  };
  
  const t2 = {
    messageStatus : status,
    seenAt : seenAt
  }

  if(seenAt){
    try {
      await axios.post(`http://localhost:5001/chat/changeMessageStatus`, {id, status, seenAt});
    }catch (err) {
      console.log("err", err)
    }
  }
  
  dispatch({
    type: CHANGE_MESSAGE_STATUS, 
    payload: !seenAt ? editKeyValue(chatMessages, id, "clientMsgId", t) : editKeyValue(chatMessages, id, "clientMsgId", t2)
  });
};

export const changeMessageStatus2 = (items, receiver) => async (dispatch,getState) => {

  const{ chatMessages } = getState().chatReducer; 

  if(receiver){
      try {
        await axios.post(`http://localhost:5001/chat/changeMessageStatus2`, items);
      }catch (err) {
        console.log("err", err)
      }
  }

 dispatch({
    type: CHANGE_MESSAGE_STATUS, 
    payload: changeMessagesStatus(chatMessages, items)
  });
};
