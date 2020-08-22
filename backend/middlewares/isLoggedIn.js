const User = require("../schemas/user");

const isLoggedIn = async (req, res, next) => {
    const { email } = req.body;

    try{
        const user = await User.findOne({ email });
        user.isOnline && res.status(400).send({ code: 464 });
        !user.isOnline && next();
    }catch(err){
        console.log(err)
    } 
}


module.exports = isLoggedIn