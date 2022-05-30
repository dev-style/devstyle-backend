const mongoose = require("mongoose");
const diffHistory = require("mongoose-diff-history/diffHistory");

const { Schema } = mongoose;
const sizeSchema = new Schema(
  {
    size: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
sizeSchema.plugin(diffHistory.plugin);
module.exports = mongoose.model("Size", sizeSchema);
