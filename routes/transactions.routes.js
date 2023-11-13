const express = require("express"); //how you import express to file

const auth = require("../handlers/auth");
const addIncome = require("../controllers/transactions/addIncome");
const addExpense = require("../controllers/transactions/addExpense");
const getTransactions = require("../controllers/transactions/getTransactions");

const transactionRoutes = express.Router();

//Routess..

transactionRoutes.use(auth); /// every route after this middleware willbe controller by the auth

//Protected routes
transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addExpense);
transactionRoutes.get("/", getTransactions);

module.exports = transactionRoutes;
