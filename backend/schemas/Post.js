const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  post: {
    type: String
  },
  media: {
    type: String
  },
  mediaAlt: {
    type: String
  },
  userId: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  amountOfComments: {
    type: Number,
    default: 0
  },
  userIsOnline : {
    type: Boolean, 
    default: true
  },
  creatorAmountOfPosts: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);
