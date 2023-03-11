const express = require('express');
const {connectToMongodb} = require("../src/database/database");
const userRoute = require("../src/route/user.route");
const eventRoute = require("../src/route/event.route");
const attendeeRoute = require("../src/route/attendee.route");
require("dotenv").config();

connectToMongodb();

const PORT = process.env.PORT
const app = express();

app.use(express.json());

app.use("/user", userRoute); 
app.use("/event", eventRoute);
app.use("/attendee", attendeeRoute);  

app.get("/", (req, res)=>{
    res.status(200).send("Hello")
})

app.listen(PORT, ()=> console.log(`listening on port: ${PORT}`));