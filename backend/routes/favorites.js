const router = require("express").Router();
const verify = require("./verifyToken");
const Favorite = require("../schemas/Favorite");
const Post = require("../schemas/post");


// create favorite 

router.post("/favorites", verify, async (req, res) => { 
  const {userId,postId} = req.body 

  // check si el usuario ya guardo post en favoritos
  const favoriteExists = await Favorite.find({postId , userId:{$eq:userId}}) 
  if(favoriteExists.length === 1)return res.status(400).send({code:256});
  
  const data = new Favorite({
    userId,
    postId
  });
  try {
    const favorite = await data.save();
    res.status(200).send({ code: 255, favorite});  
  } catch (err) { 
    res.status(400).send({code: 500 }); 
  }
});

// get favorites 

router.get("/favorites/:userId", verify, async (req, res) => {  
    const { userId }  = req.params

  try { 
    const favorites = await Favorite.find({userId}).sort({createdAt:-1}); 
    res.status(200).send(favorites);  
  }catch (err) {
    console.log(err)
    res.status(400).send({code: 500}); 
  }
});

// delete favorite  

router.delete("/favorites/delete/:userId/:favoriteId", async (req,res) => {
  const { userId, postId, favoriteId } = req.params
  
  try{
    await Favorite.findOneAndDelete({postId: favoriteId, userId: userId})
    res.status(200).send({code: 257});
   // console.log(deletedFavorite)
  }catch(err){
    res.status(400).send({code:500})
  }
})

module.exports = router;