const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

function connectToMongodb(){
    mongoose.connect(MONGODB_CONNECTION);

    mongoose.connection.on("connected", ()=>{
        console.log("Connected to MongoDB successfully!");
    });

    mongoose.connection.on("error", (err)=>{
        console.log("Connection error");
    });
}

module.exports = {connectToMongodb}