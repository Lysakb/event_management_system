const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../nodemailer");
require("dotenv").config();

const register = async(req, res)=>{
    const {name, email, password, role} = req.body;
    try {
        const existingUser = await userModel.findOne({email})
        if(existingUser){
         return res.status(201).send({message:"user already exists, please login!"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new userModel({
            name: name, 
            email: email,
            password: hashedPassword,
            role: role
        })

        await user.save();

        const message = `Dear ${user.name}. You have succesfully registered to this platform.`
        await sendEmail({
            email: user.email,
            subject: "Registration",
            message
        })
        
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message)
    }
};

const login = async(req, res)=>{
    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({email});
       
        if(!user){
            return res.status(404).send({message: "user not found, please signup!"})
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(401).send({message: "Incorrect password!"});
        }
        const userID = {
            id: user._id,
            email: user.email
        }

        const token = jwt.sign(userID, process.env.SECRET_KEY, {expiresIn: "1h"});

        res.status(200).send({message: "Login successful", token: token});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {register, login}; 