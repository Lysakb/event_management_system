const express = require("express");
const eventRoute = express.Router();
const {createEvent, getEvents, getEventsById, updateEvents, deleteEvents, Addattendee, getEventStats, changeStatus} = require("../controller/event.controller");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

eventRoute.post("/add", authentication, createEvent);
eventRoute.get("/", getEvents);
eventRoute.get("/:id", authentication, getEventsById);
eventRoute.put("/update/:id", authentication, updateEvents);
eventRoute.delete("/delete/:id", authentication, authorization, deleteEvents);
eventRoute.post("/add-to-event/:id", authentication, authorization, Addattendee);
eventRoute.get("/get-stats/:id", authentication, authorization, getEventStats); 
eventRoute.put("/change-status/:id", authentication, authorization, changeStatus); 



module.exports = eventRoute; 
