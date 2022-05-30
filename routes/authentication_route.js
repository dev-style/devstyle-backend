const express = require("express");
const Router = express.Router();

const Auth = require("../controllers/authentication_controller.js");

Router.post("/register", Auth.register);
Router.post("/login", Auth.login);
module.exports = Router;
