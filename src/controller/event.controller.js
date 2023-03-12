const attendeeModel = require("../model/attendee");
const eventModel = require("../model/event");

const createEvent = async(req, res)=>{
    const body = req.body;
  
    try {
       const event = await eventModel.create(body);
  
        await event.save()
        res.status(200).send({message:"Event created", event});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEvents = async(req, res)=>{
    try {
        const events = await eventModel.find().populate("attendee", {name: 0, email: 0});
        res.status(200).send(events);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEventsById = async(req, res)=>{
    const id = req.params.id;
    try {
        const events = await eventModel.findById(id).populate("attendee");
        if(!events){
            return res.status(404).send({message: "No events found!"})
        }
        res.status(200).send(events);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateEvents = async(req, res)=>{
    const id = req.params.id;
    const {name, date, location, description} = req.body;

    try {
        const events = await eventModel.findByIdAndUpdate(id, {$set: {
            name: name,
            date: date,
            location: location,
            description: description
        }},
        {new: true}
        ); 

        if(!events){
            return res.status(404).send({message: "No events found!"});
        }
        await events.save(); 
        res.status(200).send(events);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteEvents = async(req, res)=>{
    const id = req.params.id;

    try {
        const event = await eventModel.findByIdAndDelete(id);

        res.status(200).send({message: "Event deleted successfully!"})
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {createEvent, getEvents, getEventsById, updateEvents, deleteEvents}