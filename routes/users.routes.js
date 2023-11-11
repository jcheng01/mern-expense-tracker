const express = require("express"); //how you import express to file
const register = require("../controllers/users/register");
const login = require("../controllers/users/login");
const userDashboard = require("../controllers/users/userDashboard");
const auth = require("../handlers/auth");

const userRoutes = express.Router();

//Routess..

userRoutes.post("/register", register);
userRoutes.post("/login", login);

userRoutes.use(auth); /// every route after this middleware willbe controller by the auth

userRoutes.get("/dashboard", userDashboard);

module.exports = userRoutes;
