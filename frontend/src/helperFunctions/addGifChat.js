import { emitEvent } from "../io/emitEvents/emitEvents";

export const addGifChat = (args) => {
    const { messageInfo, saveMessage, setGifstMenuOpen, socket, gif, title } = args;
    const { clientMsgId, receiver, sender, avatar, senderId, receiverId, sendedAt } = messageInfo;
    setGifstMenuOpen(false);
    saveMessage({clientMsgId, chatMessage : gif, receiver, sender, avatar, senderId, receiverId, sendedAt})
    emitEvent("send-message", {clientMsgId, chatMessage : gif, receiver, sender, avatar, senderId, receiverId, sendedAt}, socket)
  }