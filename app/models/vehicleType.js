const { string } = require("joi");

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp");

let VehicleType = new Schema({
  // name: { type: String },
  vehicleType: {
    type: String,
    default: "Mini",
    enum: [
      "Bike",
      "Auto",
      "Mini",
      "Prime Sedan",
      "Prime Play",
      "Prime Suv",
      "Lux",
      "Shuttle",
    ],
  },
  isActive: { type: Boolean, index: true, default: true },
  isDeleted: { type: Boolean, index: true, default: false },
});

VehicleType.plugin(timestamp);

module.exports = mongoose.model("VehicleType", VehicleType);
