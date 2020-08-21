import { sendMessage } from "../ioEvents/sendChatMessage";

export const addGifChat = (args) => {
    console.log("args", args)
    const { messageInfo, saveMessage, setGifstMenuOpen, socket, gif, title } = args;
    const {receiver, sender, avatar, senderId, receiverId} = messageInfo;
    //dispatch(updateQuery(null));
    setGifstMenuOpen(false);
    saveMessage({chatMessage : gif, receiver, sender, avatar, senderId, receiverId})
    sendMessage("chat message", {chatMessage : gif, receiver, sender, avatar, senderId, receiverId}, socket);
  }