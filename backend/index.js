const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001; 
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const fileupload = require("express-fileupload");

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

dotenv.config();

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

app.listen(PORT, () => console.log(`server is up and running on port ${PORT}`)); 
