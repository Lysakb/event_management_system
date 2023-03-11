const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    event: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attendee",
            required: true
        }
    ]
})

const attendeeModel = mongoose.model("Attendee", attendeeSchema);

module.exports = attendeeModel;