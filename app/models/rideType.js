const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp");

let RideType = new Schema({
  RideType: {
    type: String,
    require: true,
  },
  rideIcon: { type: String },
  isDeleted: { type: Boolean, index: true, default: false },
  isBlocked: { type: Boolean, default: false },
});

RideType.plugin(timestamp);

module.exports = mongoose.model("RideType", RideType);
