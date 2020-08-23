const MessageNotification = require("../schemas/MessageNotification");

const saveMessageNotification = async (args) => {
   try{
        await new MessageNotification(args).save()
    }catch(err){
        console.log("err", err)
    }
}

module.exports = saveMessageNotification