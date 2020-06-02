const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({ 

  userName: {
    type: String,
    required: true,
    min: 4,
    max: 255
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dewhpk9yo/image/upload/v1579267412/blank-profile-picture-973460_sr3nks.svg"
  },
  userId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Friend", friendSchema);
