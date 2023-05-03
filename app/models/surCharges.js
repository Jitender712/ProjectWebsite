const { string, number } = require("joi");

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp");

let SurgeCharges = new Schema({
  vehicleId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "VehicleType",
  },
  region: {
    type: String,
    required: true,
    default: "Delhi",
    enum: ["Delhi", "Mumbai", "Chandigarh", "Bengaluru"],
  },
  price: { type: Number, required: true, default: null },
  type: {
    type: String,
    required: true,
    default: "Fixed",
    enum: ["Fixed", "Percentage"],
  },
  isDeleted: { type: Boolean, index: true, default: false },
});

SurgeCharges.plugin(timestamp);

module.exports = mongoose.model("SurgeCharges", SurgeCharges);
