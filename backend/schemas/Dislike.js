const mongoose = require("mongoose");

const dislikeSchema = new mongoose.Schema({
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

module.exports = mongoose.model("dislike", dislikeSchema);