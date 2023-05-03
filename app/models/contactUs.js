const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2");

let ContactUs = new Schema({
  isDeleted: { type: Boolean, default: false },
  title: { type: String },
  content: { type: String },
  userType: { type: String, enum: ["Consumer", "Driver"] },
  // userId: { type: Schema.Types.ObjectId, ref: "userType", default: null },
  userArray: {
    type: [
      {
        _id:Schema.Types.ObjectId,
        name: String,
        phoneNo: String,
        email:String,
      },
    ],
  },
});

ContactUs.plugin(mongoosePanginate);
ContactUs.plugin(timestamp);

module.exports = mongoose.model("ContactUs", ContactUs);
