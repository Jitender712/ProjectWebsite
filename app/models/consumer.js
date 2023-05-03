const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2");

let Consumer = new Schema({
  name: { type: String },
  email: { type: String },
  phoneNo: { type: String },
  role: { type: String, default: "Consumer" },
  // password: { type: String, default: null },
  address: { type: String },
  deviceToken: { type: String, default: null },
  deviceType: { type: String, default: null },
  emailOtp: { type: Number, default: null },
  emailOtpStart: { type: Number, default: null },
  forgotEmailOtp: { type: Number, default: null },
  forgotEmailOtpStart: { type: Number, default: null },
  resendOtp: { type: Number, default: null },
  resendOtpStart: { type: Number, default: null },
  token: { type: String, required: false, unique: true },
  isDeleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  additionalData: { type: Schema.Types.Mixed },
  currentStatus: {
    type: String,
    default: "Offline",
    enum: ["Offline", "Online"],
  },
  consumerImage: { type: String, default: null },
  isBlocked: { type: Boolean, default: false },
  referralCode: { type: String },
  averageRating: { type: Number, default: 0, max: 5 },
});

Consumer.plugin(mongoosePanginate);
Consumer.plugin(timestamp);

module.exports = mongoose.model("Consumer", Consumer);
