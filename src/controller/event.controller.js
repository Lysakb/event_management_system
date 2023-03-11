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
        const events = await eventModel.find()
        res.status(200).send(events);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {createEvent, getEvents}