const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  replies: {
    type: Number,
    default: 0
  },
  postId: { 
    type: String
  },
  userId: {
    type: String
  },
  commentId: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comment", commentSchema);
