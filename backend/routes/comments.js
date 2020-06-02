const router = require("express").Router();
const verify = require("./verifyToken");
const Comment = require("../schemas/comment");
const Post = require("../schemas/post");
const Notification = require("../schemas/Notification");

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
    const commentsLength = await Comment.find({postId:{$eq:postId}})
    const comments = await Comment.find({postId:{$eq:postId}}).skip(skip).limit(limit).sort({createdAt: -1});
    console.log(comments)
    console.log(commentsLength.length)
    res.status(200).send({comments, amountOfComments: commentsLength.length});
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

// create a comment 

router.post("/post/:postId/comments", verify, async (req, res) => {
  const { userName, comment, avatar, postId, postCreator, title, userId } = req.body;
  const data = new Comment({
    userName,
    comment,
    avatar,
    userId,
    postId,
    title
  });
 
  // notification
  const noti = new Notification({ 
    userName,
    userId,
    postId,
    postCreator, 
    message: `${userName} commented your post! ${title}...`
  }) 
  try {
    const specificPost = await Post.findById(postId)
    specificPost.amountOfComments += 1;
    await specificPost.save();
    const savedComment = await data.save();
    await noti.save();
    res.status(210).send({ code: 251, message: "commented!", savedComment });
  } catch (err) {
    res.status(500).send({ code: 499, message: "failed to comment!" });
  }
});

module.exports = router;
