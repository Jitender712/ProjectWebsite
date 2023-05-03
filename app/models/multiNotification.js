const { ObjectId } = require("mongodb");

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2"),
  objectId = Schema.objectId;

let MultipleNotification = new Schema({
  isDeleted: { type: Boolean, default: false },
  messageType: { type: String },
  messageTitle: { type: String },
  userType: { type: String, default: null, enum: ["Driver", "Consumer"] },
  userArray: {
    type: [
      {
        _id: ObjectId,
        name: String,
        phoneNo: String,
        deviceToken:String,
      },
    ],
  },
  messageContent: { type: String },
});

MultipleNotification.plugin(mongoosePanginate);
MultipleNotification.plugin(timestamp);

module.exports = mongoose.model("MultipleNotification", MultipleNotification);
