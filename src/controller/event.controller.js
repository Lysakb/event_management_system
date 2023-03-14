const attendeeModel = require("../model/attendee");
const eventModel = require("../model/event");
const sendEmail = require("../nodemailer");

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
        const events = await eventModel.find().populate("attendee", {name: 0, email: 0, event: 0});
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
       
        if(!event){
            return res.status(500).send({meesage: "Event is not available"})
        }
    res.status(200).send({message: "Event deleted successfully!"})
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const Addattendee = async(req, res)=>{
    const id = req.params.id;
    const {attendee} = req.body;

    try {
        
        const event = await eventModel.findById(id);
        const Attendee = await attendeeModel.findById({_id: attendee});

 
        event.attendee = event.attendee.concat(Attendee._id);
        await event.save();
        await Attendee.save();

        const message = `You have been added to the event: ${event.name}`
        await sendEmail({
            email: Attendee.email,
            subject: "Technology",
            message
        })
        
        res.status(200).send({message: `${Attendee.name} is added to the event!`, event})
       
    } catch (error) {
        res.status(400).send(error.message);
    } 

}

const getEventStats = async(req, res)=>{
    try {
        const stats = await eventModel.aggregate([
            {$lookup: { from: 'attendees', localField: 'Attendees', foreignField: '_id', as: 'attendeeDetails'}},
            {$project: {
            _id: 0,
            attendeeCount: {$sum: 1}
           
           }},
           ])
        console.log({stats})
    } catch (error) {
        res.status(400).send(error.message); 
    }
}
 
module.exports = {createEvent, getEvents, getEventsById, updateEvents, deleteEvents, Addattendee, getEventStats}