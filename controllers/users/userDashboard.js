const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const usersModel = mongoose.model("users");
  console.log(req.user);

  const getUser = await usersModel
    .findOne({
      _id: req.user.id,
    })
    .select("-password -name");

  res.status(200).json({
    status: "Hello from user dash",
    data: getUser,
  });
};

module.exports = userDashboard;
