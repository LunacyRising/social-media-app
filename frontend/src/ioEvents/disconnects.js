

export const disconnects = (event, message, socket) => {
    return socket.emit(event, message)
}

export const socketOff = socket => {
    return socket.off()
}