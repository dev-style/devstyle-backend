const mongoose = require("mongoose");
const diffHistory = require("mongoose-diff-history/diffHistory");

const { Schema } = mongoose;

const ambassadorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {},
    social: [
      {
        id: Schema.Types.Number,
        name: String,
        link: String,
      },
    ],
    colors: {
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
ambassadorSchema.plugin(diffHistory.plugin);
module.exports = mongoose.model("Ambassador", ambassadorSchema);
