const router = require("express").Router();
const verify = require("./verifyToken");
const Post = require("../schemas/post");
const User = require("../schemas/user");
const Comment = require("../schemas/comment");
const Notification = require("../schemas/Notification");
const Like = require("../schemas/Like")
const Dislike = require("../schemas/Dislike")

//CREATE POST
router.post("/createPost", verify, async (req, res) => {
  const { userName, email, post, avatar, userId,title, creatorAmountOfPosts } = req.body;
  
  const data = new Post({ 
    userName,
    email,
    title,
    post,
    avatar,
    userId,
    creatorAmountOfPosts
  });
  try { 
    const savedPost = await data.save();
    await User.findOneAndUpdate({_id: userId},{$inc: { amountOfPosts : 1 }});
    res.status(201).send({ code: 234, message: "Post Created!", savedPost });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

// GET ONE POST
router.get("/posts/:postId", verify, async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    const likes = post.likes;
    res.status(200).send({ code: 235, post, likes });
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
    console.log(postsByUser)
  }catch(err){

  }
})

//GET POST BY POSTID
router.get("/posts/:postId", async(req,res) => {
  const {postId} = req.params;
  try{
    const postsById = await Post.find({postId})
    res.status(200).send(postsById)
    console.log(postsById)
  }catch(err){
    res.status(500).send({code:9999})
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
// GET ALL POSTS
router.post("/posts/", async (req, res) => { 

  const { skip, limit} = req.body

  let start = skip ? parseInt(skip): 0;

  let maxPosts = limit ? parseInt(limit): 2;

  try { 
    const amountOfPosts = await Post.find()
    const posts = await Post.find().skip(start).limit(maxPosts).sort({ date: -1 });
    res.status(200).send({ code: 236, posts, amountOfPosts: amountOfPosts.length }); 
  } catch (err) {
    res.status(400).send({ code: 500 });
    console.log("error")
  }
});


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
    const deletedPost = await Post.deleteOne({ _id: postId });

    // borrar todos los comentarios del post
    const deleteComments = await Comment.deleteMany({postId})

    // borrar todos los likes del comentario borrado
    const deleteLikes = await Like.deleteMany({postId})

     // borrar todos los dislikes del comentario borrado
     const deleteDisikes = await Dislike.deleteMany({postId})

    res.status(200).send({ code: 250, message: "post deleted!", deletedPost });
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
  const existentLike = await Like.find({postId, userId:{$eq:userId}})
  if(existentLike.length === 1)return res.status(400).send({code:253});

   // el post que se lleva el like o dislike 
  const specificPost = await Post.findById(postId);
 
// check si el usuario ya dio un dislike
  const existentDislike = await Dislike.find({postId, userId:{$eq:userId}})
  if(existentDislike.length === 1)
  await Dislike.deleteOne({postId, userId:{$eq:userId}})
  specificPost.dislikes > 0 ? specificPost.dislikes -= 1 : null
  await specificPost.save();

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
    // incrementar el like count del post en 1
    const incrementLikeCount = await Post.findById(postId);
    incrementLikeCount.likes += 1
    await incrementLikeCount.save();
    res.status(201).send({ code: 239, message: "Like Created!", savedLike });
  } catch (err) {
    res.status(400).send({ code: 500, message: "Failed !" });
  }
});

//dislike
router.post("/posts/:postId/dislike", verify, async (req, res) => {
  const {postId,userId} = req.body;
   // check si el usuario ya dio Dislike
   const existentDislikeike = await Dislike.find({postId, userId:{$eq:userId}})
   if(existentDislikeike.length === 1)return res.status(400).send({code:254});

   // el post que se lleva el like o dislike 
   const specificPost = await Post.findById(postId);

   // check si el usuario ya dio un Like
  const existentLike = await Like.find({postId, userId:{$eq:userId}})
  if(existentLike.length === 1)
  await Like.deleteOne({postId, userId:{$eq:userId}})
  specificPost.likes > 0 ? specificPost.likes -= 1 : null
  await specificPost.save();

 // crear Dislike
 const dislike =  new Dislike({
  postId,
  userId 
})
  try {
    // guardar Dislike
    const savedDislike = await dislike.save();
    // incrementar el like count del post en 1
    const incrementDislikeCount = await Post.findById(postId);
    incrementDislikeCount.dislikes =+ 1
    await incrementDislikeCount.save();
    res.status(201).send({ code: 240, message: "Dislike Created!", savedDislike });
  } catch (err) {
    res.status(400).send({ code: 500, message: "Failed !" });
  }
});

module.exports = router;
