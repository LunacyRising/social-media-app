const ChatMessage = require("../schemas/ChatMessage");

const saveChatMessage = async (data) => {
   try{
        const message = new ChatMessage(data).save();
        return message
    }catch(err){
        console.log("err", err)
    }
}

module.exports = saveChatMessage