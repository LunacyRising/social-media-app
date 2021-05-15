import { apiUtil } from "../utils/apiUtil/apiUtil"
import { emitEvent } from "../io/emitEvents/emitEvents";

export const addImageChat = async (e, data) => {
    const { token, messageInfo, saveMessage, socket } = data;
    const { clientMsgId, receiver, sender, avatar, senderId, receiverId, sendedAt } = messageInfo;
    const image = e.target.files[0];
    const previewImage = new FormData(); 
    previewImage.append("image", image);
    const response = await apiUtil.post("/posts/imagePreview", previewImage, { headers: { "auth-token": token, "Content-Type": "multipart/form-data" } }); 
    const preview = response.data.preview;
    // test
    saveMessage({ clientMsgId, chatMessage : preview, receiver, sender, avatar, senderId, receiverId, sendedAt})
    emitEvent("send-message", {chatMessage : preview, clientMsgId, receiver, sender, avatar, senderId, receiverId, sendedAt}, socket);
  };