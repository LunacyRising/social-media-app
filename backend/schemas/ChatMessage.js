const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    chatMessage: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    clientMsgId: {
        type: String,
        required: true
    },
    messageStatus: {
        type: String,
        required: true
    },
    seenAt: {
        type: Date
    },
    sendedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
