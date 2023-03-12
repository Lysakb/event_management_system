const attendeeModel = require("../model/attendee");
const eventModel = require("../model/event");

const createAttendee = async (req, res)=>{
    const body = req.body;

    try {
        const attendee = await attendeeModel.create(body); 
       
        await attendee.save();
        res.status(200).send(attendee);
       
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getAttendee = async(req, res)=>{
    try {
        const events = await attendeeModel.find();
        res.status(200).send(events);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAttendeeById = async(req, res)=>{
    const id = req.params.id;
    try {
        const events = await attendeeModel.findById(id);
        if(!events){
            return res.status(404).send({message: "No attendee found!"})
        }
        res.status(200).send(events);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateAttendee = async(req, res)=>{
    const id = req.params.id;
    const {name, email} = req.body;

    try {
        const attendee = await attendeeModel.findByIdAndUpdate(id, {$set:{name:name, email:email}},
        {new: true}); 

        if(!attendee){
            return res.status(404).send({message: "No attendee found!"});
        }
        await attendee.save(); 
        res.status(200).send(attendee);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteAttendee = async(req, res)=>{
    const id = req.params.id;

    try {
        const event = await attendeeModel.findByIdAndDelete(id);

        res.status(200).send({message: "Attendee deleted successfully!"})
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {getAttendee, getAttendeeById, createAttendee, updateAttendee,deleteAttendee}