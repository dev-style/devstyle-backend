const mongoose = require("mongoose");
const diffHistory = require("mongoose-diff-history/diffHistory");

const { Schema } = mongoose;
const newsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
newsletterSchema.plugin(diffHistory.plugin);
module.exports = mongoose.model("Newsletter", newsletterSchema);
