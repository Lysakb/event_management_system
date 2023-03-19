const express = require("express");
const userRoute = express.Router();
const {register, login} = require("../controller/user.controller");
const authentication = require("../middleware/authentication");

userRoute.post("/https://event-management-system-2mri.onrender.com/api/v1/register", register);
userRoute.post("/login", login);

module.exports = userRoute;