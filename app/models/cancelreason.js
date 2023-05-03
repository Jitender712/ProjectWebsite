const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2");

let CancelReasonsForAdmin = new Schema({
  reason: { type: String, default: null },
  reasonId: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: "ReasonForCancelling",
  },
  userType: { type: String, default: null, enum: ["Driver", "Consumer"] },
  isDeleted: { type: Boolean, defailt: false },
  userId: {
    type: Schema.Types.ObjectId,
    default: null,
    refPath: "userType",
  },
});

CancelReasonsForAdmin.plugin(mongoosePanginate);
CancelReasonsForAdmin.plugin(timestamp);

module.exports = mongoose.model("CancelReasonsForAdmin", CancelReasonsForAdmin);
