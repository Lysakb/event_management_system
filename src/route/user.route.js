const express = require("express");
const userRoute = express.Router();
const {register, login} = require("../controller/user.controller");
const authentication = require("../middleware/authentication");

userRoute.post("/register", register);
userRoute.post("/login", login);

module.exports = userRoute;