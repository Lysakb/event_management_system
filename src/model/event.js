const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    date:{
        type: Date,
        required: true
    },

    location:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["approved", "rejected"]
    },

    // reason: {
    //     type: String,
        
    // },

    attendee: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attendee",
        }]
})

const eventModel = mongoose.model("Event", eventSchema);

module.exports = eventModel;