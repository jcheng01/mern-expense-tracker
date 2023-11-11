const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transaction: {
      type: String,
      required: true,
      enum: ["Income", "Expense"],
    },
    remarks: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const usersModel = mongoose.model("transactions", transactionsSchema);

module.exports = transactionsSchema;
