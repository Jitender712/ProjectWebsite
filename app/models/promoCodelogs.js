const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2");

let PromoCodeLogs = new Schema({
  isDeleted: { type: Boolean, default: false },
  currentTotalFare: { type: Number, required: true },
  updatedTotalFare: { type: Number, required: true },
  consumerId: { type: Schema.Types.ObjectId, ref: "Consumer", required: true },
});

PromoCodeLogs.plugin(mongoosePanginate);
PromoCodeLogs.plugin(timestamp);

module.exports = mongoose.model("PromoCodeLogs", PromoCodeLogs);
