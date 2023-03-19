const userModel = require("../model/user");

const authorization = async(req, res, next)=>{
    try {
        const id = req.user.id;
        const user = await userModel.findById(id);

        if(!user.role.includes("admin")){
            return res.status(401).send({
                message: "Not authorized"});
        }

        next();
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = authorization