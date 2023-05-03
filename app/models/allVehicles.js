const { string } = require("joi");

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp");

let Vehicles = new Schema({
  vehicle: { type: String, required: true },
  vehicleImage: { type: String, required: true },
  isDeleted: { type: Boolean, index: true, default: false },
});

Vehicles.plugin(timestamp);

module.exports = mongoose.model("Vehicles", Vehicles);
