const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email, name, password, confirmedPW, balence } = req.body;
  //Validations

  if (!email) throw "No email";
  if (!password) throw "No password";
  if (password.length < 5) throw "Password too short";

  const getDupEmail = await usersModel.findOne({
    email,
  });

  if (getDupEmail) throw "This Email Exists";

  const hashedPW = await bcrypt.hash(password, 6);

  const createdUser = await usersModel.create({
    name,
    email,
    password: hashedPW,
    balence,
  });
  //centralizing process of accesss token

  res.status(200).json({
    status: "success on register",
    user: {
      id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
    },
  });
};

module.exports = register;
