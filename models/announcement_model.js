const mongoose = require("mongoose");
const diffHistory = require("mongoose-diff-history/diffHistory");
const { Schema } = mongoose;

const announcementSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

announcementSchema.plugin(diffHistory.plugin);
module.exports = mongoose.model("Announcement", announcementSchema);
