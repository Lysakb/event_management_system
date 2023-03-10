const express = require("express");
const userRoute = express.Router();
const {register} = require("../controller/user.controller");
const authentication = require("../middleware/authentication");

userRoute.get("/register", register);


module.exports = userRoute;