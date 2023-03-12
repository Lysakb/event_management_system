const express = require("express");
const attendeeRoute = express.Router();
const {getAttendee, getAttendeeById, createAttendee, updateAttendee,deleteAttendee} = require("../controller/attendee.controller");
const authentication = require("../middleware/authentication");

attendeeRoute.post("/add/:id", authentication, createAttendee);
attendeeRoute.get("/", authentication ,getAttendee);
attendeeRoute.get("/:id", authentication, getAttendeeById);
attendeeRoute.put("/update/:id", authentication, updateAttendee);
attendeeRoute.delete("/delete/:id", authentication, deleteAttendee); 

module.exports = attendeeRoute; 