const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transctionsModel = mongoose.model("transactions");

  console.log(req.user);

  const getUser = await usersModel
    .findOne({
      _id: req.user.id,
    })
    .select("-password");

  const transactions = await transctionsModel
    .find({
      user_id: req.user.id,
    })
    .sort("-createdAt");

  res.status(200).json({
    status: "Hello from user dash",
    data: getUser,
    transactions,
  });
};

module.exports = userDashboard;
