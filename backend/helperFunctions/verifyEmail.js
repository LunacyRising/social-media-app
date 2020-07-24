const User = require("../schemas/user");

const verifyEmail = async (req, res, next) => {
    const { email } = req.body;

    try{
        const user = await User.findOne({ email });
        !user && res.status(400).send({ code: 462 });
        user && next();
    }catch(err){
        console.log(err)
    } 
}


module.exports = verifyEmail