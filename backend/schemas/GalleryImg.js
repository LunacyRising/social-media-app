const mongoose = require("mongoose");

const galleryImgSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
      type: String,
      required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("galleryImg", galleryImgSchema);