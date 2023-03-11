const attendeeModel = require("../model/attendee");
const eventModel = require("../model/event");

const createEvent = async(req, res)=>{
    const body = req.body;

    try {
        const event = await eventModel.create(body);
        res.status(200).send({message:"Event created", event});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEvents = async(req, res)=>{
    try {
        const events = await eventModel.find().populate("Attendee", {name: 1, email: 1});
        res.status(200).send(events);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEventsById = async(req, res)=>{
    const id = req.params.id;
    try {
        const events = await eventModel.findById(id).populate("Attendee", {name: 1, email: 1});
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
        const events = await eventModel.findByIdAndUpdate(id, {set: {
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

// const addAttendees = async(req, res)=>{
//     const id = req.params.id;
//     const {email} = req.body;

//     try {
//         const user = await attendeeModel.findOne({email});
//         const attendee = await eventModel.findById(id).populate("Attendee", {email: 1});

//         attendee.user = attendee.user.concat(user.email);
//         attendee.user.save();
//         res.status(200).send(attendee);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

const addAttendees = async (req, res)=>{
    const id = req.params.id; 
    const {email} = req.body;
    const user = req.user;

    try {
        const event = await eventModel.findById(id);
        const comment = new commentModel({
            text: text,
            user_id: user._id,
            username: `${user.username}`

        }); 
        product.comment = product.comment.concat(comment._id)
        await product.save();
        await comment.save();
        res.status(200).send(comment);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {createEvent, getEvents, getEventsById, updateEvents, deleteEvents, addAttendees}