

export const sendMessage = (event, message, socket) => {
   return socket.emit(event, message);
}