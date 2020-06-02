//user
const router = require("express").Router();
const User = require("../schemas/user");
const Post = require("../schemas/post");
const Comment = require("../schemas/comment");
const Friend = require("../schemas/friend");
const verify = require("./verifyToken");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2; 


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET 
});

// edit profile
router.post("/user/:userId", verify, async (req, res) => {
  try { 
    const { userId } = req.params;
    const {editedUserName, editedEmail} = req.body.formValues

    // reescribir la info de la base de datos
    const updatedProfile = await User.updateOne(
      { _id: userId },
      { $set: { userName: editedUserName, email: editedEmail } } 
    );
    // encontrar todos los posts del usuario para cambiar su nombre ahi tambien
    const updatePostName = await Post.updateMany({userId}, {$set:{userName: editedUserName}})
    
    // encontrar todos los comentarios del usuario y cambiar su nombre ahi tambien
    const commentsUpdateName = await Comment.updateMany({userId}, {$set: {userName: editedUserName}})
    
    // encontrar al usuario por id para usar la info editada
    const user = await User.findById(userId);
    res.status(200).send({ code: 233, user});
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

// test upload image to cloudinary
router.post("/uploadFileTest/:userId", (req, res, next) => { 
    const file = req.files.userAvatar

    const {userId} = req.params
    
    try{
      cloudinary.uploader.upload(file.tempFilePath,
        {public_id: userId, folder: "Avatars"},
         async (err, result) => {
          res.status(200).send({code: 235, result});
          const updatePostAvatar = await Post.updateMany({userId}, {$set:{avatar: result.secure_url}})
          const updateUserAvatar = await User.updateOne({_id: userId}, {$set:{avatar: result.secure_url}})
          const updateCommentAvatar = await Comment.updateMany({userId},{$set:{avatar: result.secure_url}})
        }
      );
    }catch(err){
      res.status(400).send({code: 500});   
    }
  })

// addfriend
router.post("/addFriend", verify, async (req, res) => {
  const { userName, avatar, userId } = req.body;

  // check si el usuario ya tiene a ese amigo agregado
  const friendExists = await Friend.find({userId , userName:{$eq:userName}}) 
  if(friendExists.length === 1) return res.status(400).send({code:259}); 

  const data = new Friend({ userName, avatar, userId });

  try{
    const savedFriend = await data.save();
    res.status(201).send({ code: 258 , savedFriend }); 
  }catch(err){
    res.status(400).send({code: 500});  
  }
})

// fetch friends
router.get("/:userId/friends", verify, async (req, res) => {

  const { userId } = req.params;
  
  const friends = await Friend.find({userId , userId:{$eq:userId}}); 

  try{
    res.status(200).send({ friends }); 
  }catch(err){
    res.status(400).send({code: 500});  
  }
})
 

module.exports = router;
