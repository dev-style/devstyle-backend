const mongoose = require("mongoose");
const diffHistory = require("mongoose-diff-history/diffHistory");

const { Schema } = mongoose;

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: { type: Number, required: true },
    from: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
clientSchema.plugin(diffHistory.plugin);
module.exports = mongoose.model("Client", clientSchema);
