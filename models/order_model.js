const mongoose = require("mongoose");
const diffHistory = require("mongoose-diff-history/diffHistory");

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    number: { type: Number, required: true },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    initDate: { type: Date, default: Date.now() },
    endDate: { type: Date },
  },
  { timestamps: true }
);
orderSchema.plugin(diffHistory.plugin);
module.exports = mongoose.model("Order", orderSchema);
