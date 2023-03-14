const express = require("express");
const eventRoute = express.Router();
const {createEvent, getEvents, getEventsById, updateEvents, deleteEvents, Addattendee, getEventStats} = require("../controller/event.controller");
const authentication = require("../middleware/authentication");

eventRoute.post("/add", authentication, createEvent);
eventRoute.get("/", getEvents);
eventRoute.get("/:id", authentication, getEventsById);
eventRoute.put("/update/:id", authentication, updateEvents);
eventRoute.delete("/delete/:id", authentication, deleteEvents);
eventRoute.post("/add-to-event/:id", authentication, Addattendee);
eventRoute.get("/get-stats/:id", authentication, getEventStats); 


module.exports = eventRoute;