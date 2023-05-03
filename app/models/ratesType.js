const { string, number } = require("joi");

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp");

let RatesType = new Schema({
  vehicleId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "VehicleType",
  },
  price: { type: Number, required: true, default: null },
  type: {
    type: String,
    required: true,
    default: "Kilometer",
    enum: ["Kilometer", "Miles"],
  },

  isDeleted: { type: Boolean, index: true, default: false },
});

RatesType.plugin(timestamp);

module.exports = mongoose.model("RateTypes", RatesType);
