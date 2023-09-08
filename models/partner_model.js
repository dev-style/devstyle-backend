const mongoose = require("mongoose");
const diffHistory = require("mongoose-diff-history/diffHistory");

const { Schema } = mongoose;

const partnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logoColor: {},
    logoWhite: {},
    logoBlack: {},
    link: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
partnerSchema.plugin(diffHistory.plugin);
module.exports = mongoose.model("Partner", partnerSchema);
