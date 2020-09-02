const router = require("express").Router();
const ChatMessage = require("../schemas/ChatMessage");


router.post("/chat/changeMessageStatus", async (req, res) => { 

    const { id, status, seenAt } = req.body;  

    //console.log("body", req.body)

    try {
        await ChatMessage.updateOne({clientMsgId: id}, { $set: { messageStatus: status, seenAt } });
        res.status(200).send();  
    }catch (err) {
        res.status(400).send(); 
    }
});

router.post("/chat/changeMessageStatus2", async (req, res) => { 

    const items = req.body;

    try {
         await ChatMessage.find().map( (docs) => {
            docs.map(async doc => {
               items.forEach( async item => {
                  if(doc.clientMsgId === item.clientMsgId){
                    console.log("doc", doc);
                    await ChatMessage.updateOne({clientMsgId: doc.clientMsgId}, { $set: { messageStatus: "seen", seenAt: item.seenAt } });
                  }
               })
           })
        });
        res.status(200).send();  
    }catch (err) {
        res.status(400).send(); 
    }
});
module.exports = router;