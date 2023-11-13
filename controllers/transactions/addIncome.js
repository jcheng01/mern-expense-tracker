const validator = require("validator");

const addIncome = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transctionsModel = mongoose.model("transactions");

  const { amount, remarks } = req.body;
  console.log(req.user);

  if (!amount) throw "Amount requried";
  if (!remarks) throw "remarks requried";

  // console.log(validator.isNumeric(amount.toString()));
  if (!validator.isNumeric(amount.toString()))
    throw "Amount needs to be number";

  await transctionsModel.create({
    user_id: req.user.id,
    amount,
    remarks,
    transaction: "Income",
  });

  await usersModel.updateOne(
    //this one too handler updating the users balence with the added income. practicing working with multiple
    {
      user_id: req.user.id,
    },
    {
      $inc: {
        balance: amount,
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "income added successful!",
  });
};

module.exports = addIncome;
