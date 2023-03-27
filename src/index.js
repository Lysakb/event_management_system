const express = require('express');
const userRoute = require("../src/route/user.route");
const eventRoute = require("../src/route/event.route");
const attendeeRoute = require("../src/route/attendee.route");
require("dotenv").config();


const app = express();

app.use(express.json());

app.use("/user", userRoute); 
app.use("/event", eventRoute);
app.use("/attendee", attendeeRoute);  

app.get("/", (req, res)=>{
    res.status(200).send("Hello")
})
 module.exports = app;