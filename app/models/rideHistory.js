const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2");

let RideHistory = new Schema({
  RideId: { type: Schema.Types.ObjectId, ref: "Ride" },
  Old_Status: {
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
  New_Status: {
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
  userType: { type: String, enum: ["Consumer", "Driver"] },
  userId: { type: Schema.Types.ObjectId, ref: "userType", default: null },
 
});

RideHistory.plugin(mongoosePanginate);
RideHistory.plugin(timestamp);

module.exports = mongoose.model("RideHistory", RideHistory);
