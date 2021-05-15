const User = require("../schemas/User");

const emailConfirmed = async (req, res, next) => {
    const { email } = req.body;

    try{
        const user = await User.findOne({ email });
        !user.isAuthenticated && res.status(400).send({ code: 463 });
        user.isAuthenticated && next();
    }catch(err){
        console.log(err)
    } 
}


module.exports = emailConfirmed