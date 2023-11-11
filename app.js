require("express-async-errors");

const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users.routes");
const transactionRoutes = require("./routes/transactions.routes");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO, {})
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch(() => {
    console.log("Connected to mongodb failed");
  });

//Models
require("./models/users.models");
require("./models/transaction.models");

app.use(express.json()); //use the json middleware to parse incoming payloads, basically runs first when getting to routes bellow

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

//end of all routes

app.use(errorHandler); // middleware

const port = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log(`Server started on port ${port}!`);
});
