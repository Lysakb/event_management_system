const { default: mongoose } = require("mongoose");
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
        const index = attendee.event.indexOf(id);
    
        if(index !== -1){
            event.attendee.splice(index, 1) 
        
        await attendee.save()
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

        // const savedAttendee = await attendeeModel.find(attendee)
        // if(savedAttendee){
        //     return res.status(200).json({message: "Attendee is already added"})
        // }

        event.attendee = event.attendee.concat(Attendee._id);
        await event.save();
        await Attendee.save();

        
        res.status(200).send({message: `${Attendee.name} is added to the event!`, event})
       
    } catch (error) {
        res.status(400).send(error.message);
    } 

}

const getEventStats = async(req, res)=>{
    try {
        const stats = await eventModel.aggregate([
              { 
                $group: {
                  _id: '$_id',
                  count: { $sum: 1 },
                }
              }
               ])
        console.log(stats)
    } catch (error) {
        res.status(400).send(error.message);
    }
}
 
module.exports = {createEvent, getEvents, getEventsById, updateEvents, deleteEvents, Addattendee, getEventStats}