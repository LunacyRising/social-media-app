import { sendMessage } from "../ioEvents/sendChatMessage";

export const addEmojiChat = (event, emojiObject, quillRef, chatBoxObj) => {
    console.log("chatBoxObj", chatBoxObj)
    const {setChatMessage, messageInfo, saveMessage, socket } = chatBoxObj
    setChatMessage( prev => prev ? prev + emojiObject.emoji : emojiObject.emoji)
    /*const { messageInfo, saveMessage, setGifstMenuOpen, socket, gif, title } = args;
    const {receiver, sender, avatar, senderId, receiverId} = messageInfo;
    //dispatch(updateQuery(null));
    setGifstMenuOpen(false);
    saveMessage({chatMessage : gif, receiver, sender, avatar, senderId, receiverId})
    sendMessage("chat message", {chatMessage : gif, receiver, sender, avatar, senderId, receiverId}, socket);*/
};