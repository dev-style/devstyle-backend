const mongoose = require("mongoose");
const diffHistory = require("mongoose-diff-history/diffHistory");

const { Schema } = mongoose;
const collectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    colors: {
      type: String,
      required: true,
    },
    image: {},
    views: Number,
    show: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
collectionSchema.plugin(diffHistory.plugin);
module.exports = mongoose.model("Collection", collectionSchema);
