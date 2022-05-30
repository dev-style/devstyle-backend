const mongoose = require("mongoose");
const diffHistory = require("mongoose-diff-history/diffHistory");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phone: {
      type: Number,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.plugin(diffHistory.plugin);

module.exports = mongoose.model("User", userSchema);
