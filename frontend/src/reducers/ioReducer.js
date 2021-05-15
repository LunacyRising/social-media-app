import io from "socket.io-client";
import { getApiUrl } from "../helperFunctions/getApiUrl";

const apiUrl = getApiUrl();

const initialState = {
  socket: io(apiUrl),
};

const ioReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
  
export default ioReducer;