const mongoose = require("mongoose");
const diffHistory = require("mongoose-diff-history/diffHistory");

const { Schema } = mongoose;

const affiliationSchema = new Schema(
  {
    // ambassadorName: {
    //   type: String,
    //   required: true,
    // },
    // ambassadorId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Ambassador",
    //   required: true,
    // },
    affiliateCode: {
      type: String,
      required: true,
    },
    affiliateLink: {
      type: String,
      required: true,
    },
    clicksCount: {
      type: Number,
      default: 0,
      require:false
    },
  },

  { timestamps: true }
);

affiliationSchema.plugin(diffHistory.plugin);
module.exports = mongoose.model("affiliation", affiliationSchema);
