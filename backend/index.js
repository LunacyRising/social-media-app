const express = require("express"); 
const app = express();
const PORT = process.env.PORT || 5001; 
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const cors = require("cors");
const fileupload = require("express-fileupload");
//test
const server = require('http').createServer(app);
const io = require('socket.io')(server);
//test2
const saveChatMessage = require("./helperFunctions/saveChatMessage");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(fileupload({useTempFiles: true}));
app.use(express.static(__dirname + "./public/"));

//import routes
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const postRoute = require("./routes/posts");
const userRoute = require("./routes/user");
const commentRoute = require("./routes/comments");
const notificationsRoute = require("./routes/notifications");
const favoritesRoute = require("./routes/favorites");
const gifsRoute = require("./routes/gifs");
const chatRoute = require("./routes/chat");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET 
});

//socket io stuffs
const user = {};

io.on("connection", (socket) => {

 socket.on("connects", (userName) => {
    user[userName] =  socket.id;
    console.log("userConnected:", userName)
  })

  socket.on("send-message", (data, callback) => {
    const { receiver, sender, senderId, receiverId, clientMsgId } = data;
    socket.to(user[receiver]).emit("stopped-writting", {sender, receiver, senderId});
    const answer = true;
    socket.emit("message-sent", {receiverId, clientMsgId}, async () => {
      if(!user[receiver]){
        saveChatMessage({...data, messageStatus: "unseen"});
        console.log("no esta online")
      }else{
        const message = await saveChatMessage({...data, messageStatus: "sent"});
        socket.to(user[receiver]).emit("receive-message", {...message._doc, answer});
      };
    });
    callback && callback()
  })
 
  socket.on("message-seen", ({sender, clientMsgId, seenAt}, callback) =>{
    socket.to(user[sender]).emit("message-seen-confirmed", {clientMsgId, seenAt});
    callback()
  })

  socket.on("is-writting", ({sender, receiver, senderId}) => {
    socket.to(user[receiver]).emit("is-writting2", {sender, senderId});

  })

  socket.on("stopped-writting2", (data) => {
    const { sender, receiver } = data;
    socket.to(user[receiver]).emit("stopped-writting", {sender});
  });

  socket.on("message-seen-confirmed-2", ({sender, receiver, messages}) => {
    socket.to(user[receiver]).emit("message-seen-confirmed-2", {sender, receiver, messages} );
  })

  socket.on("disconect", (text) => {
    console.log(text)
  })
})



//connect to the db

const dbConnection = async () => { 
  try{
      await mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true },
      console.log("connected to the dbbb!"))
      }
  catch(error) {
      console.log(error)
  }
}

dbConnection()

//route middlewares
app.use("/", authRoute);
app.use("/", postRoute);
app.use("/", adminRoute);
app.use("/", userRoute);
app.use("/", commentRoute);
app.use("/", notificationsRoute);
app.use("/", favoritesRoute);
app.use("/", gifsRoute);
app.use("/", chatRoute);

server.listen(PORT, () => console.log(`server is up and running on port ${PORT}`)); 
