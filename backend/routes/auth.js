const router = require("express").Router();
const User = require("../schemas/user");
const Post = require("../schemas/post");
const Like = require("../schemas/Like")
const Dislike = require("../schemas/Dislike")
const Favorite = require("../schemas/Favorite");
const FriendRequest = require("../schemas/FriendRequestNotification");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyPassword = require("../middlewares/verifyPassword");
const verifyEmail = require("../middlewares/verifyEmail");
const emailConfirmed = require("../middlewares/emailConfirmed");
const isLoggedIn = require("../middlewares/isLoggedIn");

//register normal
router.post("/register", async (req, res) => {
  const { name, email, userName, password, lastName } = req.body;

  //check si el mail ya existe
  const emailExists = await User.findOne({ email });
  if (emailExists)
    return res
      .status(400)
      .send({ code: 460 });
  // check si el userName existe
  const userExists = await User.findOne({ userName });
  if (userExists)
    return res
      .status(400)
      .send({ code: 459 });
      
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //crear nuevo usuario
  const user = new User({
    name,
    lastName,
    userName,
    email,
    password: hashPassword
  });
  try {
    await user.save();
    res.status(201).send({ code: 230, user });
  } catch (err) {
    res.status(500).send({ code: 500 });
  }
});

//login normal
router.post("/login", isLoggedIn, verifyEmail, verifyPassword, emailConfirmed, async (req, res) => { 
  const { email } = req.body;
  const user = await User.findOne({ email });
  // find user likes and dislikes
  const likes = await Like.find({userId: user._id});
  const dislikes = await Dislike.find({userId: user._id})
  // find favorites
  const favorites = await Favorite.find({userId: user._id})
  // find friendrequests
  const friendRequests = await FriendRequest.find({friendId: user._id})

  try {
    await Post.updateMany({userName: user.userName}, {$set:{userIsOnline: true}});
    await User.updateMany({userName: user.userName}, {$set:{isOnline: true}})  
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res
      .header("auth-token", token)
      .status(200)
      .send({
        token, 
        code: 231,
        user,
        likes,
        dislikes,
        favorites,
        friendRequests
      });
  } catch (err) {
    res.status(500).send({ code: 500 });
  }
});

// authenticate email
router.put("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const updatedUser = await User.updateOne(
      { email },
      { isAuthenticated: true }
    );
    res.status(200).send({ code: 232, updatedUser });
  } catch (err) {
    res.status(400).send(500);
  }
});

//logout

router.post("/logout", async (req,res) => {
  const {userId} = req.body;
  try{
    await User.updateOne({_id: userId}, {$set:{isOnline: false}})
    await Post.updateMany({userId},{$set:{userIsOnline:false}})
    res.status(201).send({code:900})
  }catch(err) {
    console.log(err)
    res.status(400).send({code: 500})
  }
})

module.exports = router;
