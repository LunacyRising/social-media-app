

export const emitEvent = (event, data, socket, cb) => { 
    return socket.emit(event, data, cb);
}