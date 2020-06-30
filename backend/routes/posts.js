const router = require("express").Router();
const verify = require("./verifyToken");
const Post = require("../schemas/post");
const User = require("../schemas/user");
const Comment = require("../schemas/comment");
const Notification = require("../schemas/Notification");
const Like = require("../schemas/Like")
const Dislike = require("../schemas/Dislike")
const cloudinary = require("cloudinary").v2; 


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET 
});


const uploadMedia = (media, options) => {
  return new Promise((resolve, reject) => {
   cloudinary.uploader.upload(media, options, (err, result) => {
     if(result) {
       resolve(result)
     }else{
       reject(err)
     }
   })
 })
}



//CREATE POST
router.post("/createPost", verify, async (req, res) => { 
 
  const { userId } = req.body; 
  const image = req.files !== null && req.files.media;

  console.log(req.body)

  const cloudinaryResponse =  image && await uploadMedia(image.tempFilePath, {public_id: image.name, folder: "Post Images"}); 
  const postImage =  cloudinaryResponse && cloudinaryResponse.secure_url;
  const newPostContent = image ? {...req.body, media: postImage} : {...req.body}; 
  console.log(newPostContent)

  try{
    const newPost = await new Post(newPostContent).save();
    await User.findOneAndUpdate({_id: userId},{$inc: { amountOfPosts : 1 }});
    res.status(201).send({ code: 234, message: "Post Created!", newPost });
  }catch(err){
      console.log(err)
      res.status(400).send({ code: 500 });
    }
});


// GET ALL POSTS
router.post("/posts", async (req, res) => { 

  const { skip, limit, query, order} = req.body  

  console.log(limit, skip) 

  let start = parseInt(skip);

  let postsLimit = parseInt(limit);

  console.log(`query : ${query}`) 

  const initialSearch = 
  await Post
      .find()
      .skip(start)
      .limit(postsLimit)
      .sort({ date: -1 });   
        
  const searchByQuery =
  await Post
      .find({$or: [{title: {$regex: query !== null && query !== undefined && query, $options: "mgix"}},{post:{$regex: query !== null && query !== undefined &&  query, $options: "mgix"}}]})
      .skip(start)
      .limit(postsLimit)
      .sort({ date: -1 });

  try { 
    const totalAmountOfPosts = await Post.countDocuments();

    const postsFoundByQuery = query && query !== undefined && await Post.countDocuments({$or: [{title: {$regex: query !== null && query !== undefined && query, $options: "mgix"}},{post:{$regex: query !== null && query !== undefined &&  query, $options: "mgix"}}]})

    const amountOfPosts = !query || query === undefined ? totalAmountOfPosts : postsFoundByQuery

    const posts = query === null || query === undefined ? initialSearch : searchByQuery

    //console.log(posts)

    //console.log(!query || query === undefined ? totalAmountOfPosts : postsFoundByQuery)
    let code =  posts == postsFoundByQuery && postsFoundByQuery === 0  ? 300 : null
    res.status(200).send({ code, posts, maxResults: amountOfPosts});  
    
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

//GET POST BY USER
router.get("/posts/user/:userId", verify, async(req,res) => {
  const {userId} = req.params;
  try{
    const postsByUser = await Post.find({userId})
    res.status(200).send(postsByUser)
  }catch(err){

  }
})

//GET  ONE POST BY POSTID
router.get("/posts/:postId/", async(req,res) => {
  const { postId } = req.params;
  try{
    const post = await Post.findOne({_id: postId})
    res.status(200).send(post)
  }catch(err){
    res.status(500).send({code:9999})
  }
})

//GET POSTS BY POSTID
router.get("/posts/:postId/favs", async(req,res) => {
  const { postId } = req.params;
  try{
    const post = await Post.find({_id: postId})
    res.status(200).send(post)
  }catch(err){
    res.status(500).send({code:999})
  }
})

// EDIT POST  
router.post("/posts/:postId/edit", verify, async (req,res) => {

  const { postId } = req.params

  const { editedPost } = req.body

  const post = editedPost

  try {
     await Post.updateOne(
      { _id: postId },
      { $set: { post } }
    );
    const finalPost = await Post.findById(postId);
    
    res.status(200).send({ code: 252, finalPost });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
})

// GET OLDEST POSTS
router.get("/posts/oldest/asd", async (req, res) => {
  try {
    const posts = await Post.find().sort();
    res.status(200).send({ code: 237, posts });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

// DELETE POST
router.delete("/posts/:postId", verify, async (req, res) => {
  const { postId } = req.params;
  try {
    //borrar el post
    await Post.deleteOne({ _id: postId });

    // borrar todos los comentarios del post
    await Comment.deleteMany({"postId": postId})

    // borrar todos los likes del comentario borrado
    await Like.deleteMany({"postId": postId})

     // borrar todos los dislikes del comentario borrado
    await Dislike.deleteMany({"postId": postId})

    res.status(200).send({ code: 250, message: "post deleted!"}); 
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});


// DELETE  all POSTs
router.post("/deleteAll", async (req, res) => {
  try {
    //borrar el post
    const deletedPost = await Post.deleteMany();

    // borrar todos los comentarios del post
    const deleteComments = await Comment.deleteMany()

    // borrar todos los likes del comentario borrado
    const deleteLikes = await Like.deleteMany()

     // borrar todos los dislikes del comentario borrado
     const deleteDisikes = await Dislike.deleteMany()

    res.status(200).send({ code: 250, message: "post deleted!", deletedPost });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

// POST BY MOST LIKES

router.get("/posts/mostLikes/asd", async (req, res) => {
  try {
    const posts = await Post.find().sort({ likes: -1 });
    res.status(200).send({ code: 238, posts });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

//LIKE
router.post("/posts/:postId/likes", verify, async (req, res) => {
  const {postId, userId , creatorUserName, title, userName} = req.body;

  // check si el usuario ya dio like
  const existentLike = await Like.findOne({postId, userId:{$eq:userId}, commentId: { $exists: false }}) 
  console.log(existentLike)
  if(existentLike) return res.status(400).send({code:253});
  

  // si el usuario ya dio un dislike antes
  const existentDislike = await Dislike.findOne({postId, userId:{$eq:userId}})
  console.log(existentDislike)
  if(existentDislike) {
    await Dislike.deleteOne({postId, userId:{$eq:userId}})
    await Post.findOneAndUpdate({_id: postId},{$inc: { dislikes : -1 }});
  }

 // crear like
 const like =  new Like({
  postId,
  userId 
})

// notification 
const notification = new Notification({ 
  userName: userName,
  userId : userId,  
  postId,
  creatorUserName,
  message: `${userName} liked your post! ${title}...`
})
  try {
    // guardar like
    const savedLike = await like.save();
    // guardar noti
   const savedNoti =  await notification.save();
    // incrementar el conteo de likes del post
    await Post.findOneAndUpdate({_id: postId},{$inc: { likes : 1 }});
    res.status(201).send({ code: 239, message: "Like Created!", savedLike });
  } catch (err) {
    res.status(400).send({ code: 500, message: "Failed !" });
  }
});




//dislike
router.post("/posts/:postId/dislike", verify, async (req, res) => {
  const {postId,userId} = req.body;
   // check si el usuario ya dio Dislike
   const existentDislikeike = await Dislike.findOne({postId, userId:{$eq:userId}, commentId: { $exists: false }})
   if(existentDislikeike)return res.status(400).send({code:254});

   // si el usuario ya dio un like antes 
  const existentLike = await Like.findOne({postId, userId:{$eq:userId}})
  if(existentLike){
    await Like.deleteOne({postId, userId:{$eq:userId}})
    await Post.findOneAndUpdate({_id: postId},{$inc: { likes : -1 }});
  }

 // crear Dislike
 const dislike =  new Dislike({
  postId,
  userId 
})
  try {
    // guardar Dislike
    const savedDislike = await dislike.save();
    // incrementar el like count del post en 1
    await Post.findOneAndUpdate({_id: postId},{$inc: { dislikes : 1 }});
    res.status(201).send({ code: 240, message: "Dislike Created!", savedDislike });
  } catch (err) {
    res.status(400).send({ code: 500, message: "Failed !" });
  }
});

// imagen preview de post 

router.post("/posts/imagePreview", verify, async (req, res) => {

  const { image } = req.files;

  try{
    const cloudinaryResponse = await uploadMedia(image.tempFilePath,{public_id: image.name, folder: "Posts Images"});
    const previewImagePost = cloudinaryResponse.secure_url;
    res.status(200).send({preview: previewImagePost});  
  }catch(err){
    console.log(err)
    res.status(400).send({code:500})
  }
})

module.exports = router;
