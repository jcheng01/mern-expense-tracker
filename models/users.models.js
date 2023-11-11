const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: [true, "Balance is required"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const usersModel = mongoose.model("users", userSchema);

module.exports = usersModel;
