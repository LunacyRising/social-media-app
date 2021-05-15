const router = require("express").Router();
const verify = require("./verifyToken");
const Comment = require("../schemas/Comment");
const Post = require("../schemas/Post"); 
const Notification = require("../schemas/Notification");
const Like = require("../schemas/Like")
const Dislike = require("../schemas/Dislike")


// create a comment 

router.post("/post/:postId/createComment", verify, async (req, res) => {

  const { userId, userName, avatar, postCreator, title, text, media, mediaAlt } = req.body;

  const { postId } = req.params;

  
  try{
    //create Comment
    const comment = await new Comment({
      userName,
      text,
      media,
      mediaAlt,
      avatar,
      userId,
      postId})
      .save();
    //create Notification
    await new Notification({
      userName,
      userId,
      postId,
      postCreator,
      message: `${userName} commented your post! ${title}...`})
      .save();
    await Post.updateOne({_id: postId}, { $inc: { amountOfComments: 1 } }) 
    res.status(210).send({ code: 251, comment });
  }catch(err){
    res.status(500).send({ code: 499});
  }
});


// create a reply 

router.post("/reply", async (req, res) => {

  const { userName, comment, avatar, userId, commentId, postId } = req.body;

  console.log(commentId)

  const data = new Comment({
    userName,
    comment,
    avatar,
    commentId,
    userId,
    postId
  });
 
  try {
    await Comment.updateOne({_id: commentId}, { $inc: { replies: 1 } }) 
    const savedReply = await data.save();
    res.status(210).send({ code: 251, message: "commented!", savedReply });
  } catch (err) {
    res.status(500).send({ code: 499, message: "failed to comment!" });
  }
});

// get replies by comment 

router.get("/:commentId/replies", async (req, res) => {

  const { commentId } = req.params

  console.log( commentId)

  try{
    const replies = await Comment.find({commentId: commentId});

    const amountOfReplies = await Comment.count({commentId: commentId});

    res.status(200).send({replies, amountOfReplies})

  }catch(err){
    res.status(400).send({code: 500})
  }
})



// get all comments

router.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).send({ code: 252, comments });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

// get comments by post 

router.post("/:postId/comments", async (req, res) => {
  
  let limit = parseInt(req.body.limit);

  let skip = parseInt(req.body.skip);

  const { postId } = req.params;
  
  try{
    //const commentsLength = await Comment.find({postId:{$eq:postId}})
    const comments = await Comment.find({postId:{$eq:postId}, commentId: { $exists: false }}).skip(skip).limit(limit).sort({createdAt: -1});
    console.log(`comentarios encontrados: ${comments.length}`)
    res.status(200).send({comments, amountOfComments: comments.length});
  }catch(err){
    res.status(400).send({code: 500})
  }
})


// delete all comments
router.post("/comments/deleteAll", async (req,res) => {
  try{
    const deletedComments = await Comment.deleteMany();
    res.status(200)
    console.log(deletedComments);
  }catch(err) { 
    res.status(400).send({code: 500})
  }
})


//like comment
router.post("/comments/:commentId/likes", verify, async (req, res) => {

  const { userId, postId } = req.body;

  const { commentId } = req.params;

  console.log(postId)

  // check si el usuario ya dio like
  const existentLike = await Like.findOne({commentId, userId:{$eq:userId}})
  if(existentLike) return res.status(400).send({code:253});

  // si el usuario ya dio un dislike antes
  const existentDislike = await Dislike.findOne({commentId, userId:{$eq:userId}}) 
  if(existentDislike){
    await Dislike.deleteOne({commentId, userId:{$eq:userId}})
    await Comment.findOneAndUpdate({_id: commentId},{$inc: { dislikes : -1 }});
  }

 // crear like
 const like =  new Like({
  postId,
  commentId,
  userId 
})
  try {
    // guardar like
    const savedLike = await like.save();
    console.log(savedLike)
    // incrementar el conteo de likes del comentario
    await Comment.findOneAndUpdate({_id: commentId},{$inc: { likes : 1 }});
    res.status(201).send({ code: 239, message: "Like Created!", savedLike });
  } catch (err) {
    res.status(400).send({ code: 500, message: "Failed !" });
  }
});


//dislike comment
router.post("/comments/:commentId/dislikes", verify, async (req, res) => {
  
  const { userId, postId } = req.body;

  const { commentId } = req.params;

  // check si el usuario ya dio dislike
  const existentDislike = await Dislike.findOne({commentId, userId:{$eq:userId}})
  if(existentDislike) return res.status(400).send({code:253});

  // si el usuario ya dio un like antes
  const existentLike = await Like.findOne({commentId, userId:{$eq:userId}}) 
  if(existentLike){
    await Like.deleteOne({commentId, userId:{$eq:userId}})
    await Comment.findOneAndUpdate({_id: commentId},{$inc: { likes : -1 }});
  }

 // crear dislike
 const dislike =  new Dislike({
  postId,
  commentId,
  userId 
})
  try {
    // guardar like
    const savedDislike = await dislike.save();
    // incrementar el conteo de dislikes del comentario
    await Comment.findOneAndUpdate({_id: commentId},{$inc: { dislikes : 1 }});
    res.status(201).send({ code: 240, message: "Dislike Created!", savedDislike });
  } catch (err) {
    res.status(400).send({ code: 500, message: "Failed !" });
  }
});


module.exports = router;
