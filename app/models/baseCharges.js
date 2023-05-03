const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp");

let BaseCharges = new Schema({
  vehicleId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "VehicleType",
  },
  price: { type: Number, required: true, default: null },
  distance: { type: Number, required: true, default: null },
  //   isActive: { type: Boolean, index: true, default: true },
  isDeleted: { type: Boolean, index: true, default: false },
});

BaseCharges.plugin(timestamp);

module.exports = mongoose.model("BaseCharges", BaseCharges);
