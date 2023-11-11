const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
//we need to authenticate the logged in user and generate them a access key so they can access proteced routes and have the login persist
const jsonwebtoken = require("jsonwebtoken");

const login = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email, password } = req.body;

  const getUser = await usersModel.findOne({
    //method to find the email from payload in the db
    email,
  });

  if (!getUser) throw "Email does not exist"; //validates

  const comparePW = await bycrypt.compare(password, getUser.password); //returns boolean

  if (!comparePW) throw "password does not match";

  const accessToken = await jsonwebtoken.sign(
    {
      id: getUser._id,
      name: getUser.name,
    },
    process.env.jwtKEY
  );

  //success response
  res.status(200).json({
    status: "success",
    message: "User logged in",
    accessToken: accessToken, //passing the access token as a response
  });
};

module.exports = login;
