const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true
  },
  userId: {
    type: String, 
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("like", likeSchema);
