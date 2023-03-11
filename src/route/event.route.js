const express = require("express");
const eventRoute = express.Router();
const {createEvent, getEvents} = require("../controller/event.controller");
const authentication = require("../middleware/authentication");

eventRoute.post("/add", authentication, createEvent);
eventRoute.get("/", getEvents);

module.exports = eventRoute;