const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const register = async(req, res)=>{
    const {name, email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            res.status(201).send({message:"user already exists, please login!"})
        }

        const salt = await bcrypt(genSalt, 10)
        const hashedPassword = await bcrypt(password, salt)
        const user = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message)
    }
};

module.exports = {register};