const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2");

let ContactInSOS = new Schema({
  userType: { type: String, default: null, enum: ["Driver", "Consumer"] },
  isDeleted: { type: Boolean, defailt: false },
  userId: {
    type: Schema.Types.ObjectId,
    default: null,
    refPath: "userType",
  },
  contactArray: { type: Array },
});

ContactInSOS.plugin(mongoosePanginate);
ContactInSOS.plugin(timestamp);

module.exports = mongoose.model("ContactInSOS", ContactInSOS);
