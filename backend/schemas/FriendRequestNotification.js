const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema({ 

  friendId: {
    type: String,
    required: true
  },  
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("FriendRequest", friendRequestSchema);
