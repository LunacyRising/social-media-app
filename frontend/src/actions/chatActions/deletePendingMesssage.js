import axios from "axios";
import { PENDING_MESSAGE_DELETED } from "../types";
import { removeItem } from "../../helperFunctions/removeItem";

export const deletePendingMessage = (id) => async (dispatch,getState) => {
    console.log("personId", id)
    const{ messagesNotifications } = getState().notificationsReducer; 

    dispatch({
        type: PENDING_MESSAGE_DELETED, 
        payload: removeItem(messagesNotifications, id, "senderId")
    });
};
