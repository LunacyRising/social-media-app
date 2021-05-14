import apiUtil from "../../utils/apiUtil/apiUtil";
import { CHANGE_MESSAGE_STATUS } from "../types";
import { editKeyValue } from "../../helperFunctions/editKeyValue";
import { changeMessagesStatus } from "../../helperFunctions/changeMessagesStatus";

export const changeMessageStatus = (id, status, seenAt) => async (dispatch,getState) => {

  const{ chatMessages } = getState().chatReducer;  

  const t = {
    messageStatus : status
  };
  
  const t2 = {
    messageStatus : status,
    seenAt : seenAt
  }

  if(seenAt){
    try {
      await apiUtil.post("/chat/changeMessageStatus", {id, status, seenAt});
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
        await apiUtil.post("/chat/changeMessageStatus2", items);
      }catch (err) {
        console.log("err", err)
      }
  }

 dispatch({
    type: CHANGE_MESSAGE_STATUS, 
    payload: changeMessagesStatus(chatMessages, items)
  });
};
