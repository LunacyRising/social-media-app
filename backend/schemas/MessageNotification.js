const mongoose = require("mongoose");

const messageNotificationSchema = new mongoose.Schema({

  receiver: {
    type: String,
    required: true
  }, 
  sender: {
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
  senderId: {
    type: String,
    required: true
  },
  receiverId: {
    type: String,
    required: true
  },
  sendedAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("MessageNotification", messageNotificationSchema);
