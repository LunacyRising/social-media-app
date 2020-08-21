import { DELETE_CHAT_BOX } from "../types";
import { removeItem } from "../../helperFunctions/removeItem";

export const deleteChat = (id) => async (dispatch, getState) => {

  const { chatBoxes } = getState().chatReducer;

  try {
    dispatch({ 
      type: DELETE_CHAT_BOX,
      payload: removeItem(chatBoxes, id, "id")
    });
  }catch (err) {
    console.log("err", err)
  }
};
