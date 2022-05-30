const mongoose = require("mongoose");
const diffHistory = require("mongoose-diff-history/diffHistory");

const { Schema } = mongoose;

const socialSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
      min: 1,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
socialSchema.plugin(diffHistory.plugin);
module.exports = mongoose.model("Social", socialSchema);
