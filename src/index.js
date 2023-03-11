const express = require('express');
const {connectToMongodb} = require("../src/database/database");
const userRoute = require("../src/route/user.route");
const eventRoute = require("../src/route/event.route");
require("dotenv").config();

connectToMongodb();

const PORT = process.env.PORT
const app = express();

app.use(express.json());

app.use("/user", userRoute); 
app.use("/event", eventRoute);

app.get("/", (req, res)=>{
    res.status(200).send("Hello")
})

app.listen(PORT, ()=> console.log(`listening on port: ${PORT}`));