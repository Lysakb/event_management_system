const express = require('express');
const {connectToMongodb} = require("../src/database/database");
require("dotenv").config();

connectToMongodb();

const PORT = process.env.PORT
const app = express();

app.get("/", (req, res)=>{
    res.status(200).send("Hello")
})

app.listen(PORT, ()=> console.log(`listening on port: ${PORT}`));