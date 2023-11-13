const mongoose = require("mongoose");

const getTransactions = async (req, res) => {
  const transctionsModel = mongoose.model("transactions");

  const transactions = await transctionsModel.find({
    user_id: req.user.id,
  });
  res.status(200).json({
    status: "Transactions get successful",
    data: transactions,
  });
};

module.exports = getTransactions;
