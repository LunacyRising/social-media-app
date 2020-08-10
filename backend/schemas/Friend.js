const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({ 

  userId: {
    type: String,
    required: true
  },
  friendId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Friend", friendSchema);
