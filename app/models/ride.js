const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2"),
  objectId = Schema.objectId;

let pickUpAddressDetails = new Schema({
  address: { type: String },
});
let destinationAddressDetails = new Schema({
  address: { type: String },
});

let Ride = new Schema({
  consumerId: { type: Schema.Types.ObjectId, ref: "Consumer" },
  location: { type: { type: String }, coordinates: [] },
  source: { type: { type: String }, coordinates: [] },
  destination: { type: { type: String }, coordinates: [] },
  vehicleType: { type: String, default: null },
  bookingTime: { type: Number, default: null },
  isSchedule: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  totalFare: { type: Number, default: 0 },
  payment: {
    type: String,
    enum: ["Initiated", "Pending", "Successfull"],
  },
  currentStatus: {
    type: String,
    default: "Initiated",
    enum: [
      "Initiated",
      "Assigned",
      "Arrived",
      "Started",
      "End",
      "Completed",
      "Cancelled",
      "Rejected",
    ],
  },
  driverId: { type: Schema.Types.ObjectId, ref: "Driver" },
  pickUpAddress: {
    type: { pickUpAddressDetails },
    default: null,
  },
  destinationAddress: {
    type: { destinationAddressDetails },
    default: null,
  },
  tip: { type: Number, default: 0 },
  rideOtp: { type: String},
  // paymentMethod: { type: String, default: "Cash" },
});

Ride.plugin(mongoosePanginate);
Ride.plugin(timestamp);
Ride.index(
  { location: "2dsphere" },
  { source: "2dsphere" },
  { destination: "2dsphere" }
);

module.exports = mongoose.model("Ride", Ride);
