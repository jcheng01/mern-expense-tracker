const mongoose = require("mongoose");
const validator = require("validator");

const addExpense = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transctionsModel = mongoose.model("transactions");

  const { amount, remarks } = req.body;

  if (!amount) throw "Amount requried";
  if (amount < 0) throw "Amount needs to be above 0";
  if (!remarks) throw "remarks requried";

  if (!validator.isNumeric(amount.toString()))
    throw "Amount needs to be number";

  await transctionsModel.create({
    user_id: req.user._id,
    amount,
    remarks,
    transaction: "Expense",
  });

  await usersModel.updateOne(
    //this one too handler updating the users balence with the added income. practicing working with multiple
    {
      _id: req.user._id,
    },
    {
      $inc: {
        balence: amount * -1,
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "expense added successful!",
  });
};

module.exports = addExpense;
