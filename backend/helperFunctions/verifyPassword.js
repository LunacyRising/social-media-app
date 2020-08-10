const bcrypt = require("bcryptjs");
const User = require("../schemas/user");

const verifyPassword = async (req, res, next) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        const validPassword = await bcrypt.compare(password, user.password);
        !validPassword && res.status(400).send({ code: 462 });
        validPassword && next();
    }catch(err){
        console.log(err)
    } 
}


module.exports = verifyPassword