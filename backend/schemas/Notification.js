const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  }, 
  postId: {
    type: String
  },
  userId: {
    type: String
  },
  creatorUserName: {
    type: String
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notification", notificationSchema);
