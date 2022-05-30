const mongoose = require("mongoose");
const diffHistory = require("mongoose-diff-history/diffHistory");

const { Schema } = mongoose;

const heroSectionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    image: {},
  },
  { timestamps: true }
);
heroSectionSchema.plugin(diffHistory.plugin);
module.exports = mongoose.model("HeroSection", heroSectionSchema);
