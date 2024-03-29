const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true,
        enum: ["admin", "user"]
    }
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
