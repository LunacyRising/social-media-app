//user
const router = require("express").Router();
const User = require("../schemas/User");
const Post = require("../schemas/Post");
const Comment = require("../schemas/Comment");
const FriendRequest = require("../schemas/FriendRequestNotification");
const Friend = require("../schemas/Friend");
const Gallery = require("../schemas/Gallery");
const galleryImg = require("../schemas/GalleryImg");
const verify = require("./verifyToken");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2; 
const { uploadMedia } = require("../helperFunctions/uploadMedia");


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
      console.log("error",err)
      res.status(400).send({code: 500});   
    }
  })

  // upload image to the gallery
router.post("/gallery/upload/:userName",  async (req, res ) => { 

  const { userName } = req.params;

  const { userId , description} = req.body;

  const file = req.files.galleryImage; 
  
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

// create friend request
router.post("/friendRequest", verify, async (req, res) => {

  const { friendId, userId, userName, avatar } = req.body

  // checkear si el usuario ya envio una peticion de amistad
  const requestExists = await FriendRequest.findOne({userId: userId});
  if(requestExists){
    return res.status(400).send({code:261})
  }
  try{
    await new FriendRequest({
      friendId,
      userId,
      userName,
      avatar
    }).save();
    res.status(200).send({code: 262})
  }catch(err){
    res.status(400).send({code: 500})
  }
})

//cancel friend request
router.delete("/cancelFriendRequest/:id", verify, async (req, res) => {

  const { id } = req.params;

  console.log("id", id)

  try{
    await FriendRequest.deleteOne({_id: id});
    res.status(200).send()
  }catch(err){
    res.status(400).send({code: 500})
  }
})

//fetch friendRequests
router.get("/friendRequests/:userId", verify, async (req, res) => {
  
  const { userId } = req.params;
  console.log(userId)
  
  try{
    const friendRequests = await FriendRequest.find({friendId: userId});
    res.status(200).send(friendRequests)
  }catch(err){
    res.status(400).send({code:500})
  }
})

// addfriend
router.post("/acceptFriendRequest", verify, async (req, res) => {

  console.log(req.body)

  const { requestUserId, userId } = req.body
  //para la persona A
  const friendLink = await new Friend({ friendId: requestUserId, userId }).save();
  //para la persona B
  const friendLink2 = await new Friend({ friendId:userId, userId: requestUserId }).save();
  try{
    res.status(201).send({ code: 258 , friendLink }); 
  }catch(err){
    res.status(400).send({code: 500});  
  }
})

// fetch friends links
router.get("/:userId/friends", verify, async (req, res) => {

  const { userId } = req.params;

  const friendLinks = await Friend.find({userId})

  try{
    res.status(200).send(friendLinks); 
  }catch(err){
    res.status(400).send({code: 500});  
  }
})


// fetch friends
router.get("/friends/:friendId", verify, async (req, res) => {

  console.log("params", req.params)

  const { friendId } = req.params; 
  
  const friends = await User.find({_id: friendId})

  try{
    res.status(200).send(friends); 
  }catch(err){
    res.status(400).send({code: 500});  
  }
})

 

module.exports = router;
