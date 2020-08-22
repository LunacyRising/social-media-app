const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  userName: {
    type: String,
    required: true,
    min: 4,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  genre: {
    type: String,
    default: null
  },
  role: {
    type: String,
    default: "user"
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dewhpk9yo/image/upload/v1579267412/blank-profile-picture-973460_sr3nks.svg"
  },
  isAuthenticated: {
    type: Boolean,
    default: "false"
  },
  isOnline: {
    type: Boolean,
    default: "false"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  symphaty: {
    type: Number,
    default: 0
  },
  amountOfPosts: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("User", userSchema);
