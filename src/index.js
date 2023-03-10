const express = require('express');
const {connectToMongodb} = require("../src/database/database");
const userRoute = require("../src/route/user.route");
require("dotenv").config();

connectToMongodb();

const PORT = process.env.PORT
const app = express();

app.use(express.json());
app.use("/", userRoute);

app.get("/", (req, res)=>{
    res.status(200).send("Hello")
})

app.listen(PORT, ()=> console.log(`listening on port: ${PORT}`));