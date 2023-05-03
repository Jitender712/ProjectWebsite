const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2"),
  objectId = Schema.objectId;

let ReasonForCancelling = new Schema({
  reason: { type: String, default: null },
  reasonDrivedBy: { type: String, default: null, enum: ["Driver", "Consumer"] },
  isDeleted: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
});

ReasonForCancelling.plugin(mongoosePanginate);
ReasonForCancelling.plugin(timestamp);

module.exports = mongoose.model("ReasonForCancelling", ReasonForCancelling);