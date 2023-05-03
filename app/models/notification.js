const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2"),
  objectId = Schema.objectId;

let Notification = new Schema({
  bookingId: { type: Schema.Types.ObjectId, ref: "Ride" },
  status: { type: String, default: "Pending" },
  message: { type: String }
});

Notification.plugin(mongoosePanginate);
Notification.plugin(timestamp);

module.exports = mongoose.model("Notification", Notification);
