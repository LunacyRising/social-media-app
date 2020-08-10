const router = require("express").Router();
const verify = require("./verifyToken");
const Notification = require("../schemas/Notification");

// get notifications

router.get("/users/:userId/notifications", verify, async (req, res) => { 
    const {userId} = req.params;  
  try {
    const notifications = await Notification.find({userId:{$eq:userId}}).sort({ createdAt: -1 });
    res.status(200).send({notifications});  
  } catch (err) {
    res.status(400).send({code: 500 }); 
  }
});

// delete notification 

router.delete("/notifications/:notificationId", verify, async (req,res) => {
  const {notificationId} = req.params
  try{
    const deletedNotification = await Notification.deleteOne({_id: notificationId});
    res.status(200).send({message: "notification deleted"});
  }catch(err){
    res.status(400).send({code:500})
  }
})

// delete all notifications

router.delete("/notifications/deleteAll/:userId",verify, async(req,res) => {
  const {userId} = req.params;
  try{
    const deleteAllnotifications = await Notification.deleteMany({userId:{$eq:userId}});
    res.status(200).send({message: "all notifications has been deleted!"});
    console.log(deleteAllnotifications)
  }catch(err){
    res.status(400).send({code: 500})
  }
})
module.exports = router;
