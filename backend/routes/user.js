//user
const router = require("express").Router();
const User = require("../schemas/user");
const Post = require("../schemas/post");
const Comment = require("../schemas/comment");
const Friend = require("../schemas/friend");
const Gallery = require("../schemas/Gallery");
const galleryImg = require("../schemas/GalleryImg");
const verify = require("./verifyToken");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2; 
const { uploadMedia } = require("../helperFunctions/uploadMedia")


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
    const {editedUserName, editedEmail} = req.body.values

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

// change user avatar
router.post("/changeAvatar/:userId", async (req, res ) => {  

    const file = req.files.userAvatar

    const { userId } = req.params

    try{
      const avatar = await uploadMedia(file.tempFilePath,{public_id: userId, folder: "Avatars"}); 
      await Post.updateMany({userId}, {$set:{avatar: avatar.secure_url}})
      await User.updateOne({_id: userId}, {$set:{avatar: avatar.secure_url}})
      await Comment.updateMany({userId}, {$set:{avatar: avatar.secure_url}})
      res.status(200).send({code: 235, avatar: avatar.secure_url});
    }catch(err){
      console.log(err)
      res.status(400).send({code: 500});   
    }
  })

  // upload image to the gallery
router.post("/gallery/upload/:userName",  async (req, res ) => { 

  const { userName } = req.params;

  //const description = req.body.galleryImage[0];
  
  //const userId = req.body.galleryImage[1];

  const { userId , description} = req.body;

  const file = req.files.galleryImage; 

  //console.log(req.body)

 // console.log(userId, description)
  
  try{
    // check si el usuario ya tiene una galeria
      const galleryExists = await Gallery.findOne({userId}) 
      if(!galleryExists)
      new Gallery({userName, userId}).save();

      await cloudinary.uploader.upload(file.tempFilePath,
      {use_filename: true, folder: userName},
       async (err, result) => {
        const data = new galleryImg({ userName , userId, image : result.secure_url, description});
        await data.save()  
        //console.log(data)
        res.status(200).send({code: 260, data});
      }
    );
  }catch(err){
    res.status(400).send({code: 500});   
  }
})

 // find specific user gallery images
 router.post("/gallery/:userName", async (req, res ) => {   
 
  const { userName } = req.params;

  const { skip, limit } = req.body;
  console.log( skip, limit)

  let start = parseInt(skip);

  let maxImages = parseInt(limit); 

  try{
      const galleryLength = await galleryImg.find({userName: userName});
      const images = await galleryImg
      .find({userName: userName})
      .skip(start)
      .limit(maxImages)
      res.status(200).send({images, amountOfImages: galleryImg.length, galleryLength: galleryLength.length})
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
