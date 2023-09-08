const mongoose = require("mongoose");
const diffHistory = require("mongoose-diff-history/diffHistory");

const { Schema } = mongoose;

const goodieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    fromCollection: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    promoPercentage: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    inPromo: {
      type: Boolean,
      required: true,
    },
    views: {
      type: Number,
    },
    size: [
      {
        type: Schema.Types.ObjectId,
        ref: "Size",
        required: true,
      },
    ],
    mainImage: {},
    availableColors: [String],
    backgroundColors: [String],
    images: [{}],
    likes: {
      type: Number,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
goodieSchema.plugin(diffHistory.plugin);
module.exports = mongoose.model("Goodie", goodieSchema);
