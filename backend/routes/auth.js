const router = require("express").Router();
const User = require("../schemas/user");
const Post = require("../schemas/post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

//register normal
router.post("/register", async (req, res) => {
  const { name, email, userName, password, lastName } = req.body;

  //check si el mail ya existe
  const emailExists = await User.findOne({ email });
  if (emailExists)
    return res
      .status(400)
      .send({ code: 460, error: "email is already in use" });
  // check si el userName existe
  const userExists = await User.findOne({ userName });
  if (userExists)
    return res
      .status(400)
      .send({ code: 459, error: "userName is already in use" });
      
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //crear nuevo usuario
  const user = new User({
    name,
    lastName,
    userName,
    email,
    password: hashPassword
  });
  try {
    await user.save();
    res.status(201).send({ code: 230, message: "account created", user });
  } catch (err) {
    res.status(500).send({ code: 500 });
  }
});

//login normal
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // check mail no existe
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .send({ code: 462, error: "email or password incorrect" });

  //check password
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res
      .status(400)
      .send({ code: 462, error: "email or password incorrect" });

  // check if the email is authenticated
  const validEmail = await user.isAuthenticated;
  !validEmail &&
    res.status(400).send({ code: 463, error: "email is not confirmed", user });

  // crear y asignar jwt
  try {
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res
      .header("auth-token", token)
      .status(200)
      .send({
        token,
        message: "logged in", 
        code: 231,
        user
      });
  } catch (err) {
    res.status(500).send({ code: 500 });
  }
    await Post.updateMany({email}, {$set:{userIsOnline: true}})
});

// authenticate email
router.put("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const updatedUser = await User.updateOne(
      { email },
      { isAuthenticated: true }
    );
    res.status(200).send({ code: 232, message: "authenticated!", updatedUser });
  } catch (err) {
    res.status(400).send(500);
  }
});

//logout

router.post("/logout", async (req,res) => {
  const {userId} = req.body;
  try{
    await Post.updateMany({userId},{$set:{userIsOnline:false}})
    res.status(201).send({code:900})
  }catch(err) {
    console.log(err)
    res.status(400).send({code: 500})
  }
})

module.exports = router;
