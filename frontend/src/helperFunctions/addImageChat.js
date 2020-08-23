import axios from "axios";
import { sendMessage } from "../ioEvents/sendChatMessage";

export const addImageChat = async (e,args) => {
    const { token, messageInfo, saveMessage, socket } = args;
    const {receiver, sender, avatar, senderId, receiverId, sendedAt} = messageInfo;
    const image = e.target.files[0];
    const previewImage = new FormData(); 
    previewImage.append("image", image);
    const response = await axios.post("http://localhost:5001/posts/imagePreview", previewImage, { headers: { "auth-token": token, "Content-Type": "multipart/form-data" } }); 
    const preview = response.data.preview;
    // test
    saveMessage({chatMessage : preview, receiver, sender, avatar, senderId, receiverId, sendedAt})
    sendMessage("chat message", {chatMessage : preview, receiver, sender, avatar, senderId, receiverId, sendedAt}, socket);
  };