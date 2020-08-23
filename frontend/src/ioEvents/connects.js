

export const connects = (event, userName, socket) => {
    return socket.emit(event, userName);
}