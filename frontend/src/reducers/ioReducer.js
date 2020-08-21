import io from "socket.io-client";
   
  const initialState = {
    socket: io("http://localhost:5001"),
  };
  
  const ioReducer = (state = initialState, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  
  export default ioReducer;