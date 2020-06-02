const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  },
  /*userName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  commentsCount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },*/
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("Favorite", favoriteSchema);
