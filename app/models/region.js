const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2");

let Region = new Schema({
  name: { type: String, required: true },
  region: {
    type: { type: String, required: true },
    coordinates: { type: Array, required: true },
  },
  isDeleted: { type: Boolean, default: false },
});

Region.plugin(mongoosePanginate);
Region.plugin(timestamp);
Region.index({ Region: "2dsphere" });

module.exports = mongoose.model("Region", Region);
